import logging

from tempfile import mkdtemp
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options as ChromeOptions

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def initialise_driver():
    chrome_options = ChromeOptions()
    chrome_options.add_argument('--headless=new')
    chrome_options.add_argument("--no-sandbox")
    # The /dev/shm partition is too small in certain VM environments, causing Chrome to fail or crash
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-dev-tools")
    chrome_options.add_argument("--no-zygote")
    chrome_options.add_argument("--single-process")
    chrome_options.add_argument(f"--user-data-dir={mkdtemp()}")
    chrome_options.add_argument(f"--data-path={mkdtemp()}")
    chrome_options.add_argument(f"--disk-cache-dir={mkdtemp()}")
    chrome_options.add_argument('--remote-debugging-pipe')
    chrome_options.add_argument("--verbose")
    chrome_options.add_argument("--log-path=/tmp")
    chrome_options.binary_location = '/opt/chrome/chrome-linux64/chrome'

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
    logger.info("Start scraping")
    driver = initialise_driver()
    driver.get("https://wbyte.dev")
    page_source = driver.page_source
    logger.info(f"Page source: {page_source}")
