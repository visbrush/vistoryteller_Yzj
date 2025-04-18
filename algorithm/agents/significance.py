import math
import queue
import random
import string
import warnings
import numpy as np
import pandas as pd
from scipy import stats
from statistics import mean
from scipy.stats import norm, powerlaw, kstest, logistic
from scipy.stats import t, chi2_contingency, linregress
from statsmodels.tsa.stattools import acf
from sklearn.preprocessing import MinMaxScaler
from matrixprofile import matrixProfile, motifs
from scipy.signal import periodogram
from statsmodels.tsa.seasonal import STL
from statsmodels.tsa.seasonal import seasonal_decompose
from sklearn.linear_model import LinearRegression


def _trend(data: pd.DataFrame, data_fact):
    print("in trend")
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            X = result[measure["field"]].values.reshape(-1)
            # Step 1: Fit X to a line by linear regression analysis
            slope, intercept, r_value, p_value, std_err = linregress(
                np.arange(len(X)), X
            )
            # Step 2: Use logistic distribution to model the distributions of slopes
            loc, scale = logistic.fit(
                np.random.randn(1000)
            )  # Fit logistic distribution to random data
            # Step 3: Compute the p-value
            p_value_logistic = 1 - logistic.cdf(slope, loc=loc, scale=scale)
            # Step 4: Define significance as S(f) = r2 * (1 - p)
            significance = r_value**2 * (1 - p_value_logistic)
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("trend significance:", significance)
    return significance


def trend(data: pd.DataFrame, trend0, trend1):
    data = data[trend0:trend1].values
    if len(data) <= 3:
        return 0
    else:
        X = np.array(range(len(data))).reshape(-1, 1)
        y = data
        reg = LinearRegression()
        reg.fit(X, y)
        # r^2
        r2 = reg.score(X, y) * 2
        if r2 < 0:
            r2 = 0
        # slope
        slope = reg.coef_[0]
        vals = logistic.cdf(slope, loc=0, scale=0.00001)[0]
        if slope >= 0:
            p = 1 - vals
        else:
            p = vals
        sig = r2 * (1 - p)
        return sig


def calculateTrend(data: pd.DataFrame, breakdown):
    potential_period = 10
    potential_period = int(potential_period)
    model = STL(data, period=int(potential_period), seasonal_deg=0).fit()
    f, pxx_den = periodogram(model.seasonal, 1)
    pxx_den = pxx_den[f != 0]
    f = f[f != 0]
    potential_period = round(1 / f[np.argmax(pxx_den[: round(len(pxx_den) / 10)])]) * 2
    print(potential_period)
    all_scale = np.max(data) - np.min(data)
    if all_scale == 0:
        return []

    try:
        raw_trends, trend_field, decompose_result = decompose(
            data, breakdown, potential_period
        )
        sorted_insight = find_trend(raw_trends, trend_field, all_scale)
    except Exception as e:
        print(e)
        return 0

    focus = []
    for trend in sorted_insight:
        score = 0.5
        result = {"score": score, "start": trend["index"][0], "end": trend["index"][-1]}
        break
    print(focus)
    return focus


def decompose(df, value_field, potential_period):
    # Use moving averages for seasonal decomposition
    decompose_result = seasonal_decompose(
        df.copy(), period=potential_period, extrapolate_trend="freq"
    )
    # The decomposed trend results are saved in the original data to form new columns
    trend_field = value_field + "_trend"
    df = df.to_frame()
    df[trend_field] = decompose_result.trend
    data = df.reset_index()
    print(data.columns)
    # identify trends
    raw_trends = identify_df_trends(data, trend_field, window_size=5)
    print("raw_trends")
    print(raw_trends)
    return raw_trends, trend_field, decompose_result


def find_trend(raw_trends, trend_field, all_scale):
    trends = []
    current_up_idx = []
    current_up = []
    current_down_idx = []
    current_down = []
    for index, item in raw_trends.iterrows():
        if "Up Trend" in raw_trends.columns and not pd.isna(item["Up Trend"]):
            current_up_idx.append(index)
            current_up.append(item[trend_field])
        elif len(current_up_idx) != 0:
            trends.append(
                {
                    "index": current_up_idx,
                    "data": current_up,
                    "scale": abs((current_up[-1] - current_up[0]) / all_scale),
                }
            )
            current_up_idx = []
            current_up = []
        if "Down Trend" in raw_trends.columns and not pd.isna(item["Down Trend"]):
            current_down_idx.append(index)
            current_down.append(item[trend_field])
        elif len(current_down_idx) != 0:
            trends.append(
                {
                    "index": current_down_idx,
                    "data": current_down,
                    "scale": abs((current_down[-1] - current_down[0]) / all_scale),
                }
            )
            current_down_idx = []
            current_down = []
    sorted_insight = sorted(trends, key=lambda t: t["scale"], reverse=True)
    return sorted_insight


def judge_df_format(df, trend_field, window_size, identify):
    if df is None:
        raise ValueError(
            "df argument is mandatory and needs to be a `pandas.DataFrame`."
        )

    if not isinstance(df, pd.DataFrame):
        raise ValueError(
            "df argument is mandatory and needs to be a `pandas.DataFrame`."
        )

    if trend_field is None:
        raise ValueError(
            "column parameter is mandatory and must be a valid column name."
        )

    if trend_field and not isinstance(trend_field, str):
        raise ValueError("column argument needs to be a `str`.")

    if trend_field not in df.columns:
        raise ValueError(
            "introduced column does not match any column from the specified `pandas.DataFrame`."
        )
    if not isinstance(window_size, int):
        raise ValueError("window_size must be an `int`")

    if isinstance(window_size, int) and window_size < 3:
        raise ValueError("window_size must be an `int` equal or higher than 3!")

    if not isinstance(identify, str):
        raise ValueError("identify should be a `str` contained in [both, up, down]!")

    if isinstance(identify, str) and identify not in ["both", "up", "down"]:
        raise ValueError("identify should be a `str` contained in [both, up, down]!")


def extract_trends_obj(df, trend_field, identify):
    objs = list()
    up_trend = {"name": "Up Trend", "element": np.negative(df[trend_field])}
    down_trend = {"name": "Down Trend", "element": df[trend_field]}
    if identify == "both":
        objs.append(up_trend)
        objs.append(down_trend)
    elif identify == "up":
        objs.append(up_trend)
    elif identify == "down":
        objs.append(down_trend)
    return objs


def struct_trend_result(df, objs, window_size):
    results = dict()
    for obj in objs:
        limit = None
        values = list()
        trends = list()
        for index, value in enumerate(obj["element"], 0):
            if limit and limit > value:
                values.append(value)
                limit = mean(values)
            elif limit and limit < value:
                if len(values) > window_size:
                    min_value = min(values)

                    for counter, item in enumerate(values, 0):
                        if item == min_value:
                            break
                    to_trend = min(from_trend + counter, len(df) - 1)
                    trend = {
                        "from": df.index.tolist()[from_trend],
                        "to": df.index.tolist()[to_trend],
                    }
                    trends.append(trend)
                limit = None
                values = list()
            else:
                from_trend = index
                values.append(value)
                limit = mean(values)
        if len(values) > 1:
            trends.append(
                {"from": df.index.tolist()[from_trend], "to": df.index.tolist()[-1]}
            )
        results[obj["name"]] = trends
    return results


def identify_trends_by_model(df, identify, results):
    if identify == "both":
        up_trends = list()

        for up in results["Up Trend"]:
            flag = True

            for down in results["Down Trend"]:
                if (
                    down["from"] < up["from"] < down["to"]
                    or down["from"] < up["to"] < down["to"]
                ):
                    if (up["to"] - up["from"]) > (down["to"] - down["from"]):
                        flag = True
                    else:
                        flag = False
                else:
                    flag = True

            if flag is True:
                up_trends.append(up)

        labels = [letter for letter in string.ascii_uppercase[: len(up_trends)]]

        for up_trend, label in zip(up_trends, labels):
            for index, row in df[up_trend["from"] : up_trend["to"]].iterrows():
                df.loc[index, "Up Trend"] = label

        down_trends = list()

        for down in results["Down Trend"]:
            flag = True

            for up in results["Up Trend"]:
                if (
                    up["from"] < down["from"] < up["to"]
                    or up["from"] < down["to"] < up["to"]
                ):
                    if (up["to"] - up["from"]) < (down["to"] - down["from"]):
                        flag = True
                    else:
                        flag = False
                else:
                    flag = True

            if flag is True:
                down_trends.append(down)

        labels = [letter for letter in string.ascii_uppercase[: len(down_trends)]]

        for down_trend, label in zip(down_trends, labels):
            for index, row in df[down_trend["from"] : down_trend["to"]].iterrows():
                df.loc[index, "Down Trend"] = label

        return df
    elif identify == "up":
        up_trends = results["Up Trend"]

        up_labels = [letter for letter in string.ascii_uppercase[: len(up_trends)]]

        for up_trend, up_label in zip(up_trends, up_labels):
            for index, row in df[up_trend["from"] : up_trend["to"]].iterrows():
                df.loc[index, "Up Trend"] = up_label

        return df
    elif identify == "down":
        down_trends = results["Down Trend"]

        down_labels = [letter for letter in string.ascii_uppercase[: len(down_trends)]]

        for down_trend, down_label in zip(down_trends, down_labels):
            for index, row in df[down_trend["from"] : down_trend["to"]].iterrows():
                df.loc[index, "Down Trend"] = down_label

        return df


def identify_df_trends(df, trend_field, window_size=5, identify="both"):
    # Determine whether the data format is correct
    judge_df_format(df, trend_field, window_size, identify)
    # Extract objects based on the parsed trend
    objs = extract_trends_obj(df, trend_field, identify)
    # Form trends into fixed results
    results = struct_trend_result(df, objs, window_size)
    # According to the trend results, mark the trend location and construct the data form
    df = identify_trends_by_model(df, identify, results)
    return df


def fact2json(data_fact):
    data_fact_json = data_fact
    return data_fact_json


def filterSubspace(datafact, df):
    subspace_filters = datafact["subspace"]
    filtered_df = df.copy()
    filter_condition = pd.Series(True, index=df.index)

    for condition in subspace_filters:
        try:
            field = condition["field"]
            operator = condition["operator"]
            value = condition["value"]

            if operator == ">=":
                filter_condition &= filtered_df[field] >= value
            elif operator == "<=":
                filter_condition &= filtered_df[field] <= value
            elif operator == ">":
                filter_condition &= filtered_df[field] > value
            elif operator == "<":
                filter_condition &= filtered_df[field] < value
            elif operator == "=":
                filter_condition |= filtered_df[field] == value
        except Exception as e:
            print("subspace填充错误，取所有值")
    filtered_df = filtered_df[filter_condition]

    return filtered_df


def filterFocus(datafact, df):
    focus_filters = datafact["focus"]
    filtered_df = pd.DataFrame(columns=df.columns)

    for filter_condition in focus_filters:
        field = filter_condition.get("field")
        value = filter_condition.get("value")
        filtered_df = pd.concat([filtered_df, df[df[field] == value]])
    return filtered_df


def seasonal_strength(model, interval=None):
    if interval:
        return max(
            0,
            1
            - np.var(model.resid[interval[0] : interval[1] + 1])
            / np.var(
                model.resid[interval[0] : interval[1] + 1]
                + model.seasonal[interval[0] : interval[1] + 1]
            ),
        )
    else:
        return max(0, 1 - np.var(model.resid) / np.var(model.resid + model.seasonal))


def changeAggregate(aggregate):
    if aggregate == "count":
        return "count"
    elif aggregate == "sum":
        return "sum"
    elif aggregate == "avg":
        return "mean"
    else:
        print("No function found for:", aggregate)
        print("default: avg")
        return "mean"


def calculateContextimpact(datafact, df):
    impact_df = filterSubspace(datafact, df)
    impact = len(impact_df) / len(df)
    return impact


def calculateFocusimpact(datafact, df):
    impact_df = filterFocus(datafact, df)
    impact = len(impact_df) / len(df)
    return impact


def calculateSimilarity(usefulData):
    window_size = 7
    model = STL(usefulData, period=int(window_size), seasonal_deg=0).fit()
    f, pxx_den = periodogram(model.seasonal, 1)
    pxx_den = pxx_den[f != 0]
    f = f[f != 0]

    window_size = round(1 / f[np.argmax(pxx_den[: round(len(pxx_den) / 10)])]) * 2
    if window_size < len(usefulData) // 50:
        window_size = window_size * ((len(usefulData) // 50) // window_size)
    print(window_size)
    max_motifs = 1

    usefulData = (usefulData - np.min(usefulData)) / (
        np.max(usefulData) - np.min(usefulData)
    )
    try:
        mp = matrixProfile.scrimp_plus_plus(usefulData, window_size)
    except Exception as e:
        print(e)
        return 0
    # max_motifs=1
    mtfs, scores = motifs.motifs(usefulData, mp, max_motifs=max_motifs)
    for i in range(len(scores)):
        if np.isnan(scores[i]):
            scores[i] = 0
    for i in range(0, len(mtfs)):
        end = [m + window_size for m in mtfs[i]]
        result = {
            "score": 1.5 - scores[i] / math.sqrt(window_size),
            "start": mtfs[i],
            "end": end,
        }
    return result


def calculateSeasonality(data):
    potential_period = 10
    model = STL(data, period=int(potential_period), seasonal_deg=0).fit()
    f, pxx_den = periodogram(model.seasonal, 1)
    period = round(1 / f[np.argmax(pxx_den[: round(len(pxx_den) / 10)])]) * 2
    if period > len(data) / 2:
        return 0
    seasonal_resid = [
        np.mean(np.abs(model.resid[i : i + period + 1]))
        for i in range(0, len(data), period)
    ]
    print(seasonal_resid)
    resid_mean = np.mean(seasonal_resid)
    resid_std = np.std(seasonal_resid)
    print(resid_std)
    threshold = 1.5
    z_result = []
    for i in seasonal_resid:
        z = (i - resid_mean) / resid_std
        if z > threshold and i > resid_mean:
            z_result.append(-1)
        else:
            z_result.append(1)
    print(z_result)
    starts = []
    ends = []
    average_strength = []
    for i in range(0, len(data) - period + 1, period):
        if z_result == -1:
            return 0
        start = i
        end = period + i
        if start < end:
            starts.append(start)
            ends.append(end)
            average_strength.append(
                seasonal_strength(model, [period * i, period * (i + 1)])
            )
    result = {"score": np.mean(average_strength), "start": starts, "end": ends}
    print(result)
    return result


def calculateAutocorrelation(data):
    window_size = 10
    model = STL(data, period=window_size, seasonal_deg=0).fit()
    f, pxx_den = periodogram(model.seasonal, 1)
    window_size = round(1 / f[np.argmax(pxx_den[: round(len(pxx_den) / 10)])]) * 2
    if window_size < 5:
        window_size = window_size * (5 // window_size)

    focus = queue.PriorityQueue()
    for i in range(0, len(data), window_size):
        data_ = data[i : min(i + window_size, len(data))]
        if len(data_) <= int(math.log(window_size)) + 1:
            continue
        with warnings.catch_warnings():
            warnings.filterwarnings("ignore")
            correlation, q, p = acf(data_, nlags=int(len(data_)), qstat=True)
        abnormal = False
        for j in range(1, len(correlation)):
            if abs(correlation[j - 1]) < abs(correlation[j]):
                abnormal = True
                break
        if abnormal:
            focus.put(
                (
                    p[int(math.log(window_size))],
                    random.random(),
                    {
                        "scope": [i, i + window_size],
                        "correlation": list(correlation),
                        "p": 1 - p[int(math.log(window_size))],
                    },
                )
            )
    if focus.empty():
        return 0
    result = focus.get()[1]
    return result


def _rank(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            X = result[measure["field"]].values.reshape(-1)
            # Step 1: Sort X in descending order and obtain the maximum value xmax.
            X.sort()
            # Step 2: Fit the values in X to a power-law distribution and check residuals' normality.
            fit_params = powerlaw.fit(X)
            estimated_X = powerlaw.rvs(*fit_params, size=len(X))
            residuals = X - estimated_X
            # Step 3: Perform the Kolmogorov-Smirnov test for distribution fitting.
            ks_statistic, p_value = kstest(residuals, "norm")
            # Step 4: Calculate the significance S(f) = 1 - p.
            significance = 1 - p_value
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("rank significance:", significance)
    return significance


def _outlier(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            data = result[measure["field"]].values.reshape(-1)
            n = len(data)
            mean_val = np.mean(data)
            std_dev = np.std(data)
            alpha = 0.05
            G = (np.max(data) - mean_val) / std_dev
            critical_value = t.ppf(1 - alpha / (2 * n), n - 2) / np.sqrt(n - 1)
            p_value = 1 - t.cdf(G, n - 2)
            if G > critical_value and p_value < alpha:
                significance = 1 - p_value
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("outlier significance:", significance)
    return significance


def _extreme(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            X = result[measure["field"]].values.reshape(-1)
            data = np.sort(X)[::-1]
            order_index = np.arange(1, len(data) + 1)
            beta = 0.7
            predicted_X = order_index ** (-beta)
            slope, intercept = np.polyfit(np.log(order_index), np.log(data), deg=1)
            # Step 3: Train a Gaussian model for residuals
            residuals = np.log(data) - np.log(predicted_X)
            residual_mean = np.mean(residuals)
            residual_std = np.std(residuals)
            gaussian_model = norm(loc=residual_mean, scale=residual_std)
            # Step 4: Predict xmax and get the corresponding residual
            predicted_xmax = np.exp((np.log(0.7) - intercept) / slope)
            predicted_residual = np.log(predicted_xmax) - np.log(predicted_X[-1])
            # Step 5: Calculate p-value using Gaussian model
            p_value = gaussian_model.sf(predicted_residual)
            significance = p_value
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("extreme significance:", significance)
    return significance


def _association(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure_filters = data_fact_json["measure"]
            result = []
            for filter_condition in measure_filters:
                field = filter_condition.get("field")
                agg = filter_condition.get("aggregate")
                agg = changeAggregate(agg)
                result.append(df.groupby(data_fact_json["breakdown"]).agg({field: agg}))
            attribute1 = result[0].values.reshape(-1)
            attribute2 = result[1].values.reshape(-1)
            # Calculate Pearson's correlation coefficient
            r = np.corrcoef(attribute1, attribute2)[0, 1]
            # Sample size (degrees of freedom for t-distribution)
            n = len(attribute1)
            t_statistic = r * np.sqrt(n - 2) / np.sqrt(1 - r**2)
            p_value = 2 * (1 - t.cdf(np.abs(t_statistic), df=n - 2))
            significance = 1 - p_value
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("association significance:", significance)
    return significance


def _categorical(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            category_counts = (
                df[data_fact_json["breakdown"]].value_counts().values.reshape(-1)
            )
            expected_counts = np.full_like(category_counts, np.mean(category_counts))
            chi2, p_value, _, _ = chi2_contingency([category_counts, expected_counts])
            # Step 2: Calculate significance
            significance = 1 - p_value
        except Exception as e:
            print("categorical发生错误")
    else:
        significance = 0
    print("categorical Significance:", significance)
    return significance


def _proportion(data: pd.DataFrame, data_fact):
    # print('in proportion')
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            # print('proportion datafact',data_fact_json)
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            focus = data_fact_json["focus"][0]
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            target = focus["value"]
            # print('proportion result',result)
            # #计算满足条件的记录数
            # print('proportion target',target)
            # print('proportion result.index == target',result.index == target)
            condition = result.index == target
            filtered_count = result[condition][measure["field"]].values[0]
            # print('proportion filtered_count',filtered_count)
            # 计算总记录数
            total_count = result[measure["field"]].sum()
            # print('proportion total_count', total_count)

            proportion = filtered_count / total_count
            significance = proportion
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("proportion Significance:", significance)
    return significance


def _value(data: pd.DataFrame, data_fact):
    non_object_columns = data.select_dtypes(exclude=["object"])
    # 获取不是 object 类型的列的数量
    num = len(non_object_columns.columns)
    p_value = 1 / num
    significance = p_value
    print("value Significance:", significance)
    return significance


def _difference(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            X = result[measure["field"]].values.reshape(-1)
            X.sort()
            print(result, X)

            focus_filters = data_fact_json["focus"]
            focus = []
            for filter_condition in focus_filters:
                focus.append(filter_condition.get("value"))

            focus1_value = result.loc[focus[0]][measure["field"]]
            focus2_value = result.loc[focus[1]][measure["field"]]

            diff = abs(focus1_value - focus2_value)
            significance = diff / (X[-1] - X[0])
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("difference Significance:", significance)
    return significance


def _distribution(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        try:
            measure = data_fact_json["measure"][0]
            agg = changeAggregate(measure["aggregate"])
            result = df.groupby(data_fact_json["breakdown"]).agg(
                {measure["field"]: agg}
            )
            X = result[measure["field"]].values.reshape(-1)
            statistic, p_value = stats.shapiro(X)
            significance = 1 - p_value
        except Exception as e:
            print(e)
    else:
        significance = 0
    print("distribution Significance:", significance)
    return significance


def _similarity(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        measure = data_fact_json["measure"][0]
        agg = changeAggregate(measure["aggregate"])
        result = df.groupby(data_fact_json["breakdown"]).agg({measure["field"]: agg})
        usefulData = result[measure["field"]].values.reshape(-1)
        returned_sim = calculateSimilarity(usefulData)
        if returned_sim != 0:
            significance = returned_sim["score"]
    else:
        significance = 0
    print("similarity Significance:", significance)
    return significance


def _seasonality(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        measure = data_fact_json["measure"][0]
        agg = changeAggregate(measure["aggregate"])
        result = df.groupby(data_fact_json["breakdown"]).agg({measure["field"]: agg})
        usefulData = result[measure["field"]].values.reshape(-1)
        returned_sea = calculateSeasonality(usefulData)
        if returned_sea != 0:
            significance = returned_sea["score"]
    else:
        significance = 0
    print("seasonality Significance:", significance)
    return significance


def _autocorrelation(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        measure = data_fact_json["measure"][0]
        agg = changeAggregate(measure["aggregate"])
        result = df.groupby(data_fact_json["breakdown"]).agg({measure["field"]: agg})
        usefulData = result[measure["field"]].values.reshape(-1)
        returned_auto = calculateAutocorrelation(usefulData)
        if returned_auto != 0:
            significance = returned_auto["score"]
    else:
        significance = 0
    print("seasonality Significance:", significance)
    return significance


def _trend_timesieres(data: pd.DataFrame, data_fact):
    data_fact_json = fact2json(data_fact)
    df = filterSubspace(data_fact_json, data)
    significance = 0
    if len(df) > 0:
        measure = data_fact_json["measure"][0]
        breakdown = data_fact_json["breakdown"][0]
        agg = changeAggregate(measure["aggregate"])
        result = df.groupby(breakdown).agg({measure["field"]: agg})
        usefulData = result[measure["field"]]
        returned_trend = calculateTrend(usefulData, breakdown)
        if returned_trend != 0:
            significance = returned_trend["score"]
    else:
        significance = 0
    print("trend Significance:", significance)
    return significance


type_to_function = {
    "value": _value,
    "rank": _rank,
    "categorization": _categorical,
    "distribution": _distribution,
    "difference": _difference,
    "association": _association,
    "extreme": _extreme,
    "proportion": _proportion,
    "outlier": _outlier,
    "similarity": _similarity,
    "seasonality": _seasonality,
    "autocorrelation": _autocorrelation,
    "trend": _trend,
}


def calculate_datafact(data, data_fact, schema):
    data_fact_type = data_fact["type"]
    result_tuple = 0
    data_fact_breakdown_type = ""

    # 先根据schema判断breakdown是否是numerical数据
    if data_fact_type != "value":
        data_fact_breakdown = data_fact["breakdown"][0]
        for field_info in schema:
            if field_info["field"] == data_fact_breakdown:
                data_fact_breakdown_type = field_info["type"]

    if data_fact_breakdown_type == "numerical":
        return result_tuple
    else:
        if data_fact_type in type_to_function:
            result_tuple = type_to_function[data_fact_type](data, data_fact)
        else:
            print("No function found for type:", data_fact_type)
    return result_tuple
