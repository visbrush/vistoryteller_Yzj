import logging
import time


def get_logger(filename, verbosity=1, name=None):
    level_dict = {0: logging.DEBUG, 1: logging.INFO, 2: logging.WARNING}
    formatter = logging.Formatter("%(asctime)s.%(msecs)03d %(message)s")
    logger = logging.getLogger(name)
    logger.setLevel(level_dict[verbosity])

    fh = logging.FileHandler(filename, "w")
    fh.setFormatter(formatter)
    logger.addHandler(fh)

    return logger


class GPTLogger:
    def __init__(self) -> None:
        self.logger = get_logger(
            "./logs/{}.log".format(
                time.strftime("%Y-%m-%d %H.%M.%S", time.localtime(time.time()))
            )
        )

    def prompt(self, msg):
        self.logger.info("PROMPT:")
        self.logger.info("=" * 20)
        self.logger.info(msg)
        self.logger.info("=" * 20)

    def gpt(self, msg):
        self.logger.info("GPT:")
        self.logger.info("=" * 20)
        self.logger.info(msg)
        self.logger.info("=" * 20)

    def info(self, msg):
        self.logger.info(msg)


logger = GPTLogger()
