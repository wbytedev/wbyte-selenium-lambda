import logging

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options as ChromeOptions

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def initialise_driver():
    chrome_options = ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument('--disable-gpu')
    chrome_options.binary_location = '/opt/chrome/chrome-headless-shell-linux64/chrome-headless-shell'

    service = Service(
        executable_path='/opt/chrome-driver/chromedriver-linux64/chromedriver',
        service_log_path='/tmp/chromedriver.log'
    )

    driver = webdriver.Chrome(
        service=service,
        options=chrome_options
    )

    return driver


def lambda_handler(event, context):
    logger.info("Lambda started")
    driver = initialise_driver()
    driver.get("https://wbyte.dev")
    page_source = driver.page_source
    logger.info(f"Page source: {page_source}")
