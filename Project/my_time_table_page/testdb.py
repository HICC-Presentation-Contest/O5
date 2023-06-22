import pymysql
import crawling

conn = pymysql.connect(host='localhost', user='root',
                       password='hrimaly', db='test1', charset='utf8')

# def cutting_time(time): #화5수7을 화5_수7로 언더바 경계로 자름
#     if time == "":
#         return
#     num = {"0","1","2","3","4","5","6","7","8","9"}
#     cut_time = []
#     if time[0]:
#         cut_time.append(time[0])
#         cut_time.append(time[1])
#     for i in range(2,len(time)):
#         isNum = False
#         for j in num:
#             if time[i] == j:
#                 isNum = True
#                 break
#         if isNum:
#             cut_time.append(time[i])
#         else:
#             if time[i] ==",":
#                 continue
#             cut_time.append(",")
#             cut_time.append(time[i])
#     str =""
#     for i in cut_time:
#         str += i
#
#     return(str)


def cutting_time(time):
    if time == "":
        return
    num = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"}
    cut_time = []
    if time[0]:
        cut_time.append(time[0])
        cut_time.append(time[1])
    isNum = [False] * len(time)
    for i in range(len(time)):
        for j in num:
            if time[i] == j:
                isNum[i] = True
                break
    for i in range(2, len(time)):
        if isNum[i] == False: # 숫자가 이닐경우
            if time[i] == " ":
                continue
            elif time[i] == ",":
                continue
            else:
                cut_time.append(',')
                cut_time.append(time[i])
        else:   # 숫자일 경우
            now_index = i - 1
            if isNum[now_index]:
                while isNum[now_index]:
                    now_index -= 1
                cut_time.append(",")
                cut_time.append(time[now_index])
            cut_time.append(time[i])
    cut_time_str = ""
    for i in cut_time:
        cut_time_str += i
    return cut_time_str


def cutting_subject_name(name):  # 과목이름 중 영문 명 삭제
    new_name = ""
    for i in name:
        if i == "\n":
            break
        new_name += i
    return new_name


def insert(id, grade, department, name, professor, credit, time, classroom, note, completion):  # 데이터베이스에 정보를 추가
    sql = '''insert into subject 
        values("{0}", "{1}", "{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}");'''.format(id, grade, department,
                                                                                         cutting_subject_name(name),
                                                                                         professor, credit,
                                                                                         cutting_time(time), classroom,
                                                                                         note, completion)
    curs.execute(sql)


def search(search_word, grade, credit, completion):  # 검색어, 학년, 학점, 이수구분을 이용한 검색기능
    first = False
    sql = "select * from subject"
    if search_word != "0":  # 검색어가 전체가 아닐 때
        sql += " where sname like \"%" + search_word + "%\""
        first = True
    if grade != "0":
        if not first:
            sql += " where sgrade = \"" + grade + "\""
            first = True
        else:
            sql += " and sgrade = \"" + grade + "\""
    if credit != "0":
        if not first:
            sql += " where scredit = \"" + credit + "\""
            first = True
        else:
            sql += " and scredit = \"" + credit + "\""
    if completion != "0":
        if not first:
            sql += " where scompletion = \"" + completion + "\""
            first = True
        else:
            sql += " and scompletion = \"" + completion + "\""
    sql += ";"
    print(sql)
    curs.execute(sql)
    rows = curs.fetchall()
    for cur_row in rows:
        for i in cur_row:
            print(i)


curs = conn.cursor()
curs.execute("drop table if exists subject cascade")
curs.execute(""" # 수업 테이블 생성
create table subject(
                sid varchar(20),
                sgrade varchar(5),
                sdepartment varchar(30),
                sname varchar(100),
                sprofessor varchar(10),
                scredit varchar(5),
                stime varchar(20),
                sclassroom varchar(10),
                snote varchar(100), 
                scompletion varchar(10),
                primary key (sid));""")

# 크롤링한 데이터 DB에 넣음
data = crawling.class_array
for i in data:
    insert(i[4], i[0], i[1], i[5], i[11], i[6], i[12], "classroom", i[13], i[3])

# DB 테스트 출력
sql = ("select * from subject")
curs.execute(sql)
rows = curs.fetchall()
for cur_row in rows:
    for i in cur_row:
        print(i, end=",")
    print()

conn.commit()
conn.close()
