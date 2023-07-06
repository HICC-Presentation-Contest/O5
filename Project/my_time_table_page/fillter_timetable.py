def filter_time_table(result_time_table):
    morningLectureMain = []
    afternoonLectureMain = []

    for time_table in result_time_table:
        morning_Lecture_time = 0
        afternoon_Lecture_time = 0

        for schedule in time_table[1]:
            time_slots = schedule[1].split(',')  # 수업 시간표를 개별적인 시간으로 분리

            for time in time_slots:
                day = time[0]  # 시간표의 첫 번째 문자는 요일을 나타냄
                if len(time) < 2:
                    continue
                period = int(time[1:]) - 1  # 시간표의 나머지 문자는 교시를 나타냄

                # 1~4교시에 수업이 있으면 morning_Lecture_time을 1 증가
                if period < 4:
                    morning_Lecture_time += 1
                # 그 이후에 수업이 있으면 afternoon_Lecture_time을 1 증가
                else:
                    afternoon_Lecture_time += 1

        # 전체 수업 시간 중 절반 이상이 오전 시간인 경우
        if morning_Lecture_time > (morning_Lecture_time + afternoon_Lecture_time) / 2:
            morningLectureMain.append(time_table)
        else:
            afternoonLectureMain.append(time_table)

    return morningLectureMain, afternoonLectureMain