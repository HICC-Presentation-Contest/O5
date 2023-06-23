import pymysql
# import all_list_crawling
import test_read

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
        if isNum[i] == False:  # 숫자가 이닐경우
            if time[i] == " ":
                continue
            elif time[i] == ",":
                continue
            else:
                cut_time.append(',')
                cut_time.append(time[i])
        else:  # 숫자일 경우
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


def insert(index, grade, department1, department2, completion, field1, id, name, classroom, credit, limit_student,
           sugang_student, close_student, sugang_division, professor, time, note, major, field2):  # 데이터베이스에 정보를 추가
    sql = '''insert into subject 
        values({0}, "{1}", "{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}","{10}","{11}","{12}","{13}","{14}","{15}",
        "{16}","{17}","{18}");'''.format(index, grade, department1, department2, completion, field1, id,
                                         cutting_subject_name(name), classroom, credit, limit_student, sugang_student,
                                         close_student, sugang_division, professor, cutting_time(time), note, major,
                                         field2)
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
                num int,
                grade varchar(5),
                department1 varchar(30),
                department2 varchar(30),
                completion varchar(30),
                field1 varchar(30),
                id varchar(30),
                name varchar(100),
                classroom varchar(50),
                credit varchar(10),
                limit_student varchar(30),
                sugang_student varchar(30),
                close_student varchar(30),
                sugang_division varchar(30),
                professor varchar(30),
                time varchar(50),
                note varchar(100), 
                major varchar(30),
                field2 varchar(30),
                primary key (num));""")

# 크롤링한 데이터 DB에 넣음
data = test_read.class_list
index = 0
for i in data:
    for j in range(len(i)):
        i[j].replace("\n", "")
    if len(i) == 16:  # 영역 , 강의식이 없는 경우(싸강)
        insert(index, i[0], i[1], i[2], i[3], "None_field", i[4], "None_classroom", i[5], i[6], i[7], i[8], i[9], i[10],
               i[11], i[12], i[13], i[14], i[15])
    elif len(i) == 17:  # 영역이 없는 경우
        insert(index, i[0], i[1], i[2], i[3], "None_field", i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12],
               i[13], i[14], i[15], i[16])
    else:
        insert(index, i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14],
               i[15], i[16], i[17])
    index += 1

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
