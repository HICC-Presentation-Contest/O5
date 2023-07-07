import pymysql

# import all_list_crawling
# import test_read

# 각자 비밀번호로 수정해주세요
db_password = "dhqlfkrj1@"


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


# 데이터베이스에 데이터 삽입
def insert_into_subject(index, grade, department1, department2, completion, field1, id, name, classroom, credit,
                        limit_student,
                        sugang_student, close_student, sugang_division, professor, time, note, major,
                        field2):  # 데이터베이스에 정보를 추가
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
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


# DB에서 검색
  # 검색어, 인덱스(기본키), 학년, 학점, 이수구분, 구분1, 구분2를 이용한 검색기능
def search_subject(search_word, index, time, grade, credit, completion,univ, department):
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    curs.execute("use test1;")
    first = False
    sql = "select * from subject"
    if search_word != "-1":  # 검색어가 전체가 아닐 때
        sql += " where name like \"" + search_word + "%\""
        first = True
    if grade != "-1":
        if not first:
            sql += " where grade = \"" + grade + "\""
            first = True
        else:
            sql += " and grade = \"" + grade + "\""
    if univ != "-1":
        if not first:
            sql += " where major = \"" + univ + "\""
            first = True
        else:
            sql += " and major = \"" + univ + "\""
    if department != "-1":
        if not first:
            sql += " where field2 = \"" + department + "\""
            first = True
        else:
            sql += " and field2 = \"" + department + "\""
    if index != -1:
        if not first:
            sql += " where num = " + str(index)
            first = True
        else:
            sql += " and num = " + str(index)
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


# 자동완성 검색, 과목 이름은 index 7 search 함수로 해당 과목 검색 후 중복 제거
def search_subject_predictive(search_word):
    search_list = list(search_subject(search_word, -1, "-1", "-1", "-1", "-1", "-1", "-1"))
    result_list = []
    if not search_list:
        return
    result_list.append(search_list[0][7])
    for i in range(1, len(search_list)):
        isoverlapping = False
        for j in result_list:
            if j == search_list[i][7]:
                isoverlapping = True
                break
        if not isoverlapping:
            result_list.append(search_list[i][7])

    return result_list


# 테이블에 순서대로 num(1부터 끝까지, 기본키) 학년 개설학과 주관학과 이수구분 영역 학수번호 과목명 강의실 학점 제한인원 수강인원 폐강인원 수강구분 교수
# 시간, 비고, 전공, 영역 순서대로 저장
def create_subject_table():
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
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


# 로그인 테이블 생성
def create_user_table():
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    curs.execute("use test1;")
    curs.execute("""create table user(
        id varchar(30),
        password varchar(30),
        primary key(id));""")
    conn.commit()
    conn.close()


# 그룹 테이블 생성
def create_group_table():
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    curs.execute("use test1;")
    curs.execute("drop table if exists group_table")
    curs.execute("""create table group_table(
                    group_index varchar(60),
                    user_id varchar(20),
                    group_name varchar(30),
                    subject_index int,
                    default_table varchar(10),
                    primary key(group_index),
                    foreign key (subject_index) references subject(num));""")
    conn.commit()
    conn.close()


group_index = 0


def insert_into_group_table(user_id, table_name, subject_index, default_table):
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    global group_index
    curs.execute("use test1;")
    curs.execute("""insert into group_table values("{0}","{1}","{2}","{3}","{4}");""".format \
                     (user_id+table_name+str(subject_index), user_id, table_name, subject_index,
                      default_table))
    conn.commit()
    conn.close()
    group_index += 1


def drop_group_table(user_id):
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    curs.execute("use test1;")
    curs.execute("""delete from group_table where user_id = "{0}";""".format(user_id))
    conn.commit()
    conn.close()


def search_group_table(user_id):
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    data = []
    curs.execute("use test1;")
    curs.execute("""select subject.name, subject.time , subject.num, subject.professor, subject.classroom\
     ,group_table.group_name, group_table.default_table from subject, group_table where group_table.user_id = "{0}" and\
      subject.num = group_table.subject_index;\
      """.format(
        user_id))
    rows = curs.fetchall()
    data.append(user_id)

    group_data = {}
    for i in rows:
        subject_data = []
        group_name = i[5]
        if not group_name in group_data:
            group_data[group_name] = []
        for j in range(5):
            subject_data.append(i[j])
        group_data[group_name].append(subject_data)

    data.append(group_data)



    for i in rows:
        if i[6] == "True":
            data.append(i[5])
            break

    conn.commit()
    conn.close()
    if data[1] == {}:
        return -1
    return data



def insert_data():
    data = test_read.class_list
    index = 0
    for i in data:
        for j in range(len(i)):
            i[j].replace("\n", "")
        if len(i) == 16:  # 영역 , 강의식이 없는 경우(싸강)
            insert_into_subject(index, i[0], i[1], i[2], i[3], "None_field", i[4], "None_classroom", i[5], i[6], i[7],
                                i[8], i[9],
                                i[10],
                                i[11], i[12], i[13], i[14], i[15])
        elif len(i) == 17:  # 영역이 없는 경우
            insert_into_subject(index, i[0], i[1], i[2], i[3], "None_field", i[4], i[5], i[6], i[7], i[8], i[9], i[10],
                                i[11], i[12],
                                i[13], i[14], i[15], i[16])
        else:
            insert_into_subject(index, i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12],
                                i[13], i[14],
                                i[15], i[16], i[17])
        index += 1


def certify_id(id):
    exist_id = False
    conn = pymysql.connect(host='localhost', user='root',
                           password=db_password, db='test1', charset='utf8')
    curs = conn.cursor()
    curs.execute("use test1;")
    curs.execute("""select username from accounts_user;""")
    rows = curs.fetchall()
    for i in rows:
        if i[0] == id:
            exist_id = True
    conn.commit()
    conn.close()
    return exist_id



# conn = pymysql.connect(host='localhost', user='root',
#                            password=db_password, db='test1', charset='utf8')
# curs = conn.cursor()
# # curs.execute("""drop table if exists group_table;""")
# create_group_table()
# insert_into_group_table("abc", "aaaa", 123, "aaaa")
# curs.execute("""select * from group_table;""")
#
# rows = curs.fetchall()
# print(rows)
# for i in rows:
#     print(i)
# conn.commit()
# conn.close()
