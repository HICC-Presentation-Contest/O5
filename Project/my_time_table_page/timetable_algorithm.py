import itertools

def generate_possible_combinations(all_groups):
    possible_combinations = []

    def day_to_index(day):
        return {'월': 0, '화': 1, '수': 2, '목': 3, '금': 4}[day]

    # 모든 그룹의 조합을 생성
    for combination in itertools.product(*all_groups):
        timetable = [['']*12 for _ in range(5)]  # 시간표, 초기값은 빈 문자열로 설정
        valid = True  # 유효성 여부

        # 각 그룹의 과목과 시간표 확인
        for group in combination:
            course, schedule = group
            schedule_list = schedule.split(',')  # 시간표를 개별적인 시간으로 분리

            # 이미 시간표에 해당 시간이 존재하는 경우 중복이므로 유효성을 False로 설정
            for time in schedule_list:
                day = time[0]  # 시간표의 첫 번째 문자는 요일을 나타냄
                period = int(time[1:]) - 1  # 시간표의 나머지 문자는 교시를 나타냄
                if timetable[day_to_index(day)][period] != '':
                    valid = False
                    break

                # 해당 과목 추가
                timetable[day_to_index(day)][period] = course

            if not valid:
                break

        if valid:
            possible_combinations.append(timetable)

    return possible_combinations

def sort_day(timetable):
    sorted_timetable = timetable.copy()

    for day, schedule in sorted_timetable.items():
        if all(course == '' for course in schedule):
            sorted_timetable[day].append(True)
        else:
            sorted_timetable[day].append(False)

    return sorted_timetable

def convert_to_dict(combination):
    week = ['월', '화', '수', '목', '금']
    timetable_dict = {}

    for day_index, day in enumerate(week):
        timetable_dict[day] = combination[day_index]

    return timetable_dict

def get_combined_timetables(sorted_combinations):
    combined_timetables = {}

    for index, combination in enumerate(sorted_combinations, start=1):
        timetable_dict = convert_to_dict(combination)
        combined_timetables[f'조합{index}'] = timetable_dict

    return combined_timetables

def generate_combined_timetables(all_groups):
    possible_combinations = generate_possible_combinations(all_groups)
    sorted_combinations = sorted(possible_combinations, key=lambda x: (x[0][1:], x[1][1:]))

    combined_timetables = get_combined_timetables(sorted_combinations)

    for combination_name, combination in combined_timetables.items():
        combined_timetables[combination_name] = sort_day(combination)

    return combined_timetables

def add_empty_slots(combined_timetables):
    for combination_name, combination in combined_timetables.items():
        for day, schedule in combination.items():
            if schedule[-1]:  # True: 공강
                empty_slots = []
                for period, course in enumerate(schedule[:-1]):
                    if course == '':
                        empty_slots.append(period + 1)
                combined_timetables[combination_name][day].append(empty_slots)
            else:  # False: 비어있는 수업 시간
                empty_slots = []
                for period, course in enumerate(schedule[:-1]):
                    if course == '':
                        empty_slots.append(period + 1)
                combined_timetables[combination_name][day].append(empty_slots)

    return combined_timetables

# 입력 그룹 설정
group1 = [['스페인어', '월2,월3,월4'], ['컴퓨터구조', '화2,수2,목2'], ['컴퓨터네트워크', '수3,금2,금3']]
group2 = [['알고리즘분석', '화5,수5,목5'], ['프로그래밍언어론', '화9,금5,금6']]
group3 = [['대수1', '월3,월4,월5'], ['선형대수학', '화3,목4,목5'], ['확률및통계', '화4,수3,수4']]

all_groups = [group1, group2, group3]

# 가능한 조합 생성
combined_timetables = generate_combined_timetables(all_groups)

# 빈 값 및 비어있는 수업 시간 추가
combined_timetables = add_empty_slots(combined_timetables)

# 조합별 시간표 출력
for combination_name, combination in combined_timetables.items():
    print(combination_name + ":")
    for day, schedule in combination.items():
        print(day + ":", schedule)
    print()

