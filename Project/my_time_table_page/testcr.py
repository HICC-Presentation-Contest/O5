from selenium import webdriver  # 셀레니움을 활성화
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import Select  # select태크 크롤링을 위해 import하였다.
from selenium.webdriver.common.by import By
import time

url = 'https://sugang.hongik.ac.kr/cn50000.jsp'

dr = webdriver.Chrome()  # 크롬 드라이버를 실행하는 명령어를 dr로 지정
dr.get(url)  # 드라이버를 통해 url의 웹 페이지를 오픈
time.sleep(1)
act = ActionChains(dr)  # 드라이버에 동작을 실행시키는 명령어를 act로 지정
# 20221은 1학기 20222는 2학기 20225는 하계 20226은 동계
dropdown = Select(dr.find_element(By.XPATH, '//*[@id="select_abeek"]/tbody/tr[2]/td/select'))  # xpath로 element 가져오기
dropdown.select_by_value("20231")
time.sleep(1)

for i in range(3,6):
    for j in range(1,7):
        if( ((i==5) and (j==6)) or ):
            continue
        else:
            path = f'//*[@id="table_seoul"]/tbody/tr[{i}]/td[{j}]'.format(i,j)
            list= dr.find_element(By.XPATH, path)  # xpath로 element 가져오기
            act.click(list).perform()
            time.sleep(2)
            dr.switch_to.window(dr.window_handles[0])
            time.sleep(1)