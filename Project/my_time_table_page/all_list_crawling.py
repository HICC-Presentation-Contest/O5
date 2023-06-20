from selenium import webdriver  # 셀레니움을 활성화
from selenium.webdriver import ActionChains
from selenium.webdriver.support.ui import Select  # select태크 크롤링을 위해 import하였다.
from selenium.webdriver.common.by import By
import time

from selenium.webdriver.common.keys import Keys

url = 'https://sugang.hongik.ac.kr/cn50000.jsp'


# 옵션 생성
options = webdriver.ChromeOptions()
# 창 숨기는 옵션 추가
options.add_argument("headless")


# 기본 세팅하기
# dr = webdriver.Chrome(options=options)  # 크롬 드라이버를 실행하는 명령어를 dr로 지정, 이건 옵션추가
dr = webdriver.Chrome()  # 크롬 드라이버를 실행하는 명령어를 dr로 지정
dr.get(url)  # 드라이버를 통해 url의 웹 페이지를 오픈
time.sleep(1)
act = ActionChains(dr)  # 드라이버에 동작을 실행시키는 명령어를 act로 지정

dropdown = Select(dr.find_element(By.XPATH, '//*[@id="select_abeek"]/tbody/tr[2]/td/select'))  # xpath로 element 가져오기
dropdown.select_by_value("20221") # 20221은 1학기 20222는 2학기 20225는 하계 20226은 동계
time.sleep(1)



# 학부 리스트 구하기
division_list = [] # 학부 리스트
division = dr.find_element(By.XPATH, '//*[@id="table_seoul"]/tbody/tr[2]')  # 학부 분류
division = division.find_elements(By.TAG_NAME, 'th')
for division_element in division: # 학부 리스트 안에 학부 넣기
    division_list.append(division_element.text)
print(division_list) # 학부(교양) 구분


# for문 돌리면서 전체 전공, 교양에 대한 페이지 들어가 크롤링하기.

university = dr.find_element(By.XPATH, '//*[@id="table_seoul"]/tbody')  # 전체에서 테이블관련된 태그 가져온다.
table_tr_list = university.find_elements(By.TAG_NAME, 'tr')  # 테이블에서 열들을 가져온다.

for table_tr in table_tr_list:

    temporary_list = []
    # td와 th 태그를 받는다.
    department_list = table_tr.find_elements(By.CSS_SELECTOR, 'th, td')
    if len(department_list) != len(division_list):  # 가로 전공수에 맞지 않는 ['서울캠퍼스'] 등은 제외
        continue
    if len(table_tr.find_elements(By.CSS_SELECTOR, 'th')) != 0:
        for i in range(len(department_list)):
            if department_list[i].tag_name == "th":
                division_list[i] = department_list[i].text
        print("changed division list:", division_list)
    for index in range(len(department_list)):  # 각 열별로 페이지에 들어가서 크롤링 한다.
        department_name = department_list[index].text #전공이름
        temporary_list.append(department_list[index].text)
        print(temporary_list)

        if len(department_list[index].find_elements(By.TAG_NAME, 'a')) == 0: # 만약 a태그가 없으면 클릭하지 않도록
            continue
        department_list[index].find_element(By.TAG_NAME, 'a').send_keys(Keys.ENTER)
        # act.click(department_list[index]).perform()  # 전공을 선택(클릭)
        time.sleep(1)
        dr.switch_to.window(dr.window_handles[1])  # 페이지 변경
        dr.get_window_position(dr.window_handles[1])  # 페이지 변경
        time.sleep(1)

        # 새로운 페이지 안
        class_elements = dr.find_element(By.ID, 'select_list')  # 동작 할 요소 선택
        class_element_body = class_elements.find_element(By.TAG_NAME, 'tbody')  # 동작 할 요소 선택
        elements_tr = class_element_body.find_elements(By.TAG_NAME, 'tr')  # 동작 할 요소 선택

        class_array = []  # 저장할 배열
        for element_tr in elements_tr:  # tr들을 for문으로 하나하나씩 가져온다
            temporary_array = []  # 리스트 안에 원소, 즉 원소는 리스트
            elements_td = element_tr.find_elements(By.TAG_NAME, 'td')  # tr안에 td요소들을 배열에 넣는다.
            for element_td in elements_td:  # td 원소들을 하나씩 가져온다.
                # print(element_td.text)
                temporary_array.append(element_td.text)  # 원소들의 텍스트를 임시 배열(리스트 안 원소)에 넣는다.
            temporary_array.append(division_list[index]) # 전체 구분중 학부 추가
            temporary_array.append(department_name) # 전체 구분중 전공 추가
            if len(temporary_array) >= 5:  # 데이터 무결성 체크, 임시 배열이 강의라면 class 배열에 넣어준다.
                class_array.append(temporary_array)

        print(class_array)
        dr.close()
        dr.switch_to.window(dr.window_handles[0])  # 페이지 변경
        dr.get_window_position(dr.window_handles[0])  # 페이지 변경

