// import config from '@/axios/config';
import config from '../axios/config';
import axios from 'axios';
// const express = require('express');
// const cors = require('cors');
// const app = express();

// 使用 cors 中间件
// app.use(cors());
// app.listen(6039, () => {
//     console.log('Server is running on port 6039');
// });

export async function uploadFile(formData) {
    return new Promise((reslove, reject) => {
        axios({
            method: "post",
            url: `${config.url.uploadFile}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then((response) => {
            console.log(response)
            if (response.status >= 400) {
                reject();
            } else if (response.status === 200 || response.status === 201 || response.status === 204) {
                reslove(response.data);
            } else {
                reject();
            }
        }).catch(error => {
            console.log(error)
            reject();
            //  message.error('error message');
        })
    })
}



export async function generate(csv_file_paths, txt_file_path, keyPoint,uuid,outline_curve) {
    return axios({
        method: "post",
        url: `${config.url.generate}`,
        config: {
            "headers": {
                'Content-Type': 'application/json'
            },
        },
        timeout: 10000000000000,
        data:
        {
            "csv_file_paths": csv_file_paths,
            "txt_file_path": txt_file_path,
            "keyPoint": keyPoint,
            "outline_curve":outline_curve,
            "uuid":uuid,
        }
    })
}

export async function generateNarJson(requestData,csv_file_paths, txt_file_path) {
    return axios({
            method: "post",
            url: `${config.url.generateNarJson}`,
            headers: {
                'Content-Type': 'application/json'
            },
           data: {
            "csv_file_paths": csv_file_paths,
            "txt_file_path": txt_file_path,
            "keyPoint":'',
            "datafact":requestData
           },
        })
    //     .then((response) => {
    //         console.log(response)
    //         if (response.status >= 400) {
    //             reject();
    //         } else if (response.status === 200 || response.status === 201 || response.status === 204) {
    //             reslove(response.data);
    //         } else {
    //             reject();
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //         reject();
    //     })
    // })
}

export async function recordVideo(formData) {
    return axios({
        method: "post",
        url: `${config.url.recordVideo}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: formData
    })
}

export function factScoring(filename, fact, method) {
    return axios({
        "method": "POST",
        "url": config.url.factScoring,
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "data": {
            "file_name": filename,
            "fact": fact,
            "method": method,
        }
    })
}

export async function fetchStory(id) {
    return axios({
        method: "get",
        "url": `${config.url.fetch}/${id}.json`,
        config: {
            "headers": {
                'Content-Type': 'application/json; charset=utf-8'
            },
        }
    })
}

export async function share(uuid) {
    return axios({
        method: "post",
        url: `${config.url.share}`,
        config: {
            "headers": {
                'Content-Type': 'application/json; charset=utf-8'
            },
        },
        data: {
            "uuid": uuid
        }
    })
}


export async function getReport(params) {
    return axios({
        method: "get",
        url: `${config.url.getReport}`,
        params: params
    })
}

export async function deleteReport(uuid, page, per_page) {
    return axios({
        method: "delete",
        url: `${config.url.delete}`,
        params: {
            uuid: uuid,
            page: page,
            per_page: per_page
        }
    })
}

export async function search(params) {
    return axios({
        method: "get",
        url: `${config.url.search}`,
        params: params
    })
}

/*****
 *技术栈：
 ssr(后端渲染)，koa(koa-views)：模板渲染，渲染出要生成pdf的页面)
 node.js 生成pdf插件 puppeteer：将渲染的页面生成PDF
 koa-send：将生成的PDF返回给前端页面下载 
 * 
 data是后端用于渲染页面的数据
 */
export function generatePDF(data) {
    return axios({
        method: 'post',
        url: `/generatePDF`,
        param: {},
        data: data
    })
}