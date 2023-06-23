fp = open('class2_data.txt', 'r')
class_list = []

while True:
    file_line = fp.readline()
    class_information = file_line.split("_")
    class_information.pop()
    class_list.append(class_information)
    if not file_line:
        break
class_list.pop()
for i in class_list:
    print(i)
fp.close()