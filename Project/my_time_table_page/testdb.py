import pymysql

# import all_list_crawling
# import test_read
conn = pymysql.connect(host='localhost', user='root',
                       password='hrimaly', db='test1', charset='utf8')


def cutting_time(time):
    now_day = ""
    if time == "":
        return
    week = ['월', '화', '수', '목', '금']
    cut_time = []
    i = 0
    while i < len(time):
        if time[i] in week:
            now_day = time[i]
            i += 1
            continue
        elif time[i].isdigit():
            if time[i] == "1":
                if i + 1 < len(time):
                    if time[i + 1] == "0" or time[i + 1] == "1":
                        cut_time.append(now_day + time[i] + time[i + 1])
                        i = i + 2
                    elif time[i + 1] == "2":
                        if time[i - 2] + time[i - 1] == '11':
                            cut_time.append(now_day + time[i] + time[i + 1])
                            i = i + 2
                        else:
                            cut_time.append(now_day + time[i])
                            i += 1
                    else:
                        cut_time.append(now_day + time[i])
                        i += 1
                else:
                    cut_time.append(now_day + time[i])
                    i += 1

            else:
                cut_time.append(now_day + time[i])
                i += 1
        else:
            i += 1
    cut_time_str = ""
    for i in range(len(cut_time)):
        cut_time_str += cut_time[i]
        if i == len(cut_time) - 1:
            break
        cut_time_str += ','
    return cut_time_str


def cutting_subject_name(name):  # 과목이름 중 영문 명 삭제
    new_name = ""
    for i in name:
        if i == "\n":
            break
        new_name += i
    return new_name


def insert(index, grade, department1, department2, completion, field1, id, name, classroom, credit, limit_student,
           sugang_student, close_student, sugang_division, professor, time, note, major, field2):  # 데이터베이스에 정보를 추가
    curs = conn.cursor()
    sql = '''insert into subject 
        values({0}, "{1}", "{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}","{10}","{11}","{12}","{13}","{14}","{15}",
        "{16}","{17}","{18}");'''.format(index, grade, department1, department2, completion, field1, id,
                                         cutting_subject_name(name), classroom, credit, limit_student, sugang_student,
                                         close_student, sugang_division, professor, cutting_time(time), note, major,
                                         field2)
    curs.execute(sql)
    conn.commit()
    conn.close()


def search(search_word, time, grade, credit, completion):  # 검색어, 학년, 학점, 이수구분을 이용한 검색기능
    curs = conn.cursor()
    first = False
    sql = "select * from subject"
    if search_word != "-1":  # 검색어가 전체가 아닐 때
        sql += " where name like \"%" + search_word + "%\""
        first = True
    if grade != "-1":
        if not first:
            sql += " where grade = \"" + grade + "\""
            first = True
        else:
            sql += " and grade = \"" + grade + "\""
    if credit != "-1":
        if not first:
            sql += " where credit = \"" + credit + "\""
            first = True
        else:
            sql += " and credit = \"" + credit + "\""
    if completion != "-1":
        if not first:
            sql += " where completion = \"" + completion + "\""
            first = True
        else:
            sql += " and completion = \"" + completion + "\""
    sql += ";"
    curs.execute(sql)
    rows = curs.fetchall()
    conn.commit()
    conn.close()
    return rows

# 테이블에 순서대로 num(1부터 끝까지, 기본키) 학년 개설학과 주관학과 이수구분 영역 학수번호 과목명 강의실 학점 제한인원 수강인원 폐강인원 수강구분 교수
# 시간, 비고, 전공, 영역 순서대로 저장
##curs = conn.cursor()
# curs.execute("drop table if exists subject cascade")
# curs.execute(""" # 수업 테이블 생성
# create table subject(
#                 num int,
#                 grade varchar(5),
#                 department1 varchar(30),
#                 department2 varchar(30),
#                 completion varchar(30),
#                 field1 varchar(30),
#                 id varchar(30),
#                 name varchar(100),
#                 classroom varchar(50),
#                 credit varchar(10),
#                 limit_student varchar(30),
#                 sugang_student varchar(30),
#                 close_student varchar(30),
#                 sugang_division varchar(30),
#                 professor varchar(30),
#                 time varchar(50),
#                 note varchar(100),
#                 major varchar(30),
#                 field2 varchar(30),
#                 primary key (num));""")
#
# # 크롤링한 데이터 DB에 넣음
# data = test_read.class_list
# index = 0
# for i in data:
#     for j in range(len(i)):
#         i[j].replace("\n", "")
#     if len(i) == 16:  # 영역 , 강의식이 없는 경우(싸강)
#         insert(index, i[0], i[1], i[2], i[3], "None_field", i[4], "None_classroom", i[5], i[6], i[7], i[8], i[9], i[10],
#                i[11], i[12], i[13], i[14], i[15])
#     elif len(i) == 17:  # 영역이 없는 경우
#         insert(index, i[0], i[1], i[2], i[3], "None_field", i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12],
#                i[13], i[14], i[15], i[16])
#     else:
#         insert(index, i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14],
#                i[15], i[16], i[17])
#     index += 1

# DB 테스트 출력
# sql = ("select * from subject")
# curs.execute(sql)
# rows = curs.fetchall()
# for cur_row in rows:
#     for i in cur_row:
#         print(i, end=",")
#     print()
