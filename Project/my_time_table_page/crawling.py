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
dropdown.select_by_value("20221")
time.sleep(1)
list = dr.find_element(By.XPATH, '//*[@id="table_seoul"]/tbody/tr[7]/td[3]')  # xpath로 element 가져오기
act.click(list).perform()
time.sleep(1)
dr.switch_to.window(dr.window_handles[1])
dr.get_window_position(dr.window_handles[1])

class_elements = dr.find_element(By.ID, 'select_list')  # 동작 할 요소 선택
class_element_body = class_elements.find_element(By.TAG_NAME, 'tbody')  # 동작 할 요소 선택
elements_tr = class_element_body.find_elements(By.TAG_NAME, 'tr')  # 동작 할 요소 선택

class_array = [] # 저장할 배열
index = 0
for element_tr in elements_tr:
    temporary_array = []
    elements_td = element_tr.find_elements(By.TAG_NAME, 'td')
    for element_td in elements_td:
        print(element_td.text)
        temporary_array.append(element_td.text)
    if len(temporary_array) >= 3: # 데이터 무결성 체크
        class_array.append(temporary_array)

print(class_array)
