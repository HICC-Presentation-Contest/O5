import pymysql
conn = pymysql.connect(host='localhost', user='root',
                       password='hrimaly', db='test1', charset='utf8')


def cutting_time(time):
    num = {"0","1","2","3","4","5","6","7","8","9"}
    cut_time = []
    cut_time.append(time[0])
    cut_time.append(time[1])
    for i in range(2,len(time)):
        isNum = False
        for j in num:
            if time[i] == j:
                isNum = True
                break
        if isNum:
            cut_time.append(time[i])
        else:
            cut_time.append("_")
            cut_time.append(time[i])
    str =""
    for i in cut_time:
        str += i

    return(str)





def insert(id, grade, department, name, professor, credit, time, classroom, note, completion):
    sql = '''insert into subject 
        values("{0}", "{1}", "{2}","{3}","{4}","{5}","{6}","{7}","{8}","{9}");'''.format(id, grade, department, name, professor, credit, cutting_time(time), classroom, note, completion)
    curs.execute(sql)


def search(search_word, grade, credit, completion):
    first = False
    sql = "select * from subject"
    if search_word != "0": # 검색어가 전체가 아닐 때
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
curs.execute("""
create table subject(
                sid varchar(20),
                sgrade varchar(5),
                sdepartment varchar(20),
                sname varchar(20),
                sprofessor varchar(10),
                scredit varchar(5),
                stime varchar(10),
                sclassroom varchar(10),
                snote varchar(20),
                scompletion varchar(10),
                primary key (sid));""")



sql = ("select * from subject")
curs.execute(sql)
rows = curs.fetchall()
for cur_row in rows:
    for i in cur_row:
        print(i, end=",")
    print()

conn.commit()
conn.close()


