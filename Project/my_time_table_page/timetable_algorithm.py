import itertools

def day_to_index(day):
    return {'월': 0, '화': 1, '수': 2, '목': 3, '금': 4, '토': 5, '일': 6}[day]

def sort_groups(all_groups):
    if not all_groups:
        return []  # all_groups가 비어있을 경우 빈 리스트 반환

    sort_all_groups = []
    for i in all_groups:
        tmp_group=[]
        for j in i:
            tmp = []
            tmp.append(j[0][0][7])  # 대학수학(1)의 위치
            tmp.append(j[0][0][15])  # 화7,수5,수6의 위치
            tmp.append(j[0][0][0])  # 1001의 위치
            tmp.append(j[0][0][14])  # 전체의 위치
            tmp.append(j[0][0][8])  # 자연계열의 위치
            tmp_group.append(tmp)
        sort_all_groups.append(tmp_group)
    return sort_all_groups



def generate_possible_combinations(sort_all_groups):
    if not sort_all_groups:
        return []  # sort_all_groups가 비어있을 경우 빈 리스트 반환

    possible_combinations = []
    # 모든 그룹의 조합을 생성
    for combination in itertools.product(*sort_all_groups):
        timetable = [[''] * 12 for _ in range(7)]  # 시간표, 초기값은 빈 문자열로 설정
        valid = True  # 유효성 여부

        # 각 그룹의 과목과 시간표 확인
        for group in combination:
            course = group[0]
            schedule = group[1]
            if schedule == '':
                valid = False
                break

            schedule_list = schedule.split(',')  # 시간표를 개별적인 시간으로 분리

            # 이미 시간표에 해당 시간이 존재하는 경우 중복이므로 유효성을 False로 설정
            for time in schedule_list:
                day = time[0]  # 시간표의 첫 번째 문자는 요일을 나타냄
                if len(time) < 2:
                    valid = False
                    break
                period = int(time[1:]) - 1  # 시간표의 나머지 문자는 교시를 나타냄
                if timetable[day_to_index(day)][period] != '':
                    valid = False
                    break

                # 해당 과목 추가
                timetable[day_to_index(day)][period] = course

            if not valid:
                break

        # 빈 시간 확인
        if valid:
            empty_slots = [['True' for _ in range(12)] for _ in range(7)]
            for day, schedule in enumerate(timetable):
                for period, course in enumerate(schedule):
                    if course != '':
                        empty_slots[day][period] = 'False'

            # 조합 정보와 함께 결과 리스트에 추가
            possible_combinations.append([empty_slots, combination])

    possible_combinations_result_list = []  # 프론트로 보내줄 결과
    for empty_slots, combination in possible_combinations:
        possible_combinations_result_list.append(combination)

    return possible_combinations_result_list
