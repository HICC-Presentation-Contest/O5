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
act.click(list).perform()  # 전공을 선택(클릭)
time.sleep(1)
dr.switch_to.window(dr.window_handles[1])  # 페이지 변경
dr.get_window_position(dr.window_handles[1])  # 페이지 변경

class_elements = dr.find_element(By.ID, 'select_list')  # 동작 할 요소 선택
class_element_body = class_elements.find_element(By.TAG_NAME, 'tbody')  # 동작 할 요소 선택
elements_tr = class_element_body.find_elements(By.TAG_NAME, 'tr')  # 동작 할 요소 선택

class_array = []  # 저장할 배열
index = 0
for element_tr in elements_tr:  # tr들을 for문으로 하나하나씩 가져온다
    temporary_array = []  # 리스트 안에 원소, 즉 원소는 리스트
    elements_td = element_tr.find_elements(By.TAG_NAME, 'td')  # tr안에 td요소들을 배열에 넣는다.
    for element_td in elements_td:  # td 원소들을 하나씩 가져온다.
        # print(element_td.text)
        temporary_array.append(element_td.text)  # 원소들의 텍스트를 임시 배열(리스트 안 원소)에 넣는다.
    if len(temporary_array) >= 3:  # 데이터 무결성 체크, 임시 배열이 강의라면 class 배열에 넣어준다.
        class_array.append(temporary_array)

print(class_array)
