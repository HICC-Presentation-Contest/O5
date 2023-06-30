import itertools


def generate_possible_combinations(all_groups):
    possible_combinations = []

    def day_to_index(day):
        return {'월': 0, '화': 1, '수': 2, '목': 3, '금': 4, '토': 5, '일': 6}[day]

    # 모든 그룹의 조합을 생성
    for combination in itertools.product(*all_groups):
        timetable = [[''] * 12 for _ in range(7)]  # 시간표, 초기값은 빈 문자열로 설정
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

        # 빈 시간 확인
        if valid:
            empty_slots = [['True' for _ in range(12)] for _ in range(7)]
            for day, schedule in enumerate(timetable):
                for period, course in enumerate(schedule):
                    if course != '':
                        empty_slots[day][period] = 'False'

            # 조합 정보와 함께 결과 리스트에 추가
            possible_combinations.append([empty_slots, combination])

    return possible_combinations


# 입력 그룹 설정
group1 = [['스페인어', '월2,월3,월4'], ['컴퓨터구조', '화2,수2,목2'], ['컴퓨터네트워크', '수3,금2,금3']]
group2 = [['알고리즘분석', '화5,수5,목5'], ['프로그래밍언어론', '화9,금5']]
group3 = [['대수1', '월3,월4,월5'], ['선형대수학', '화3,목4,목5'], ['확률및통계', '화4,수3,수4']]

all_groups = [group1, group2, group3]

possible_combinations = generate_possible_combinations(all_groups)
possible_combinations_result_list = []  # 프론트로 보내줄 결과
for empty_slots, combination in possible_combinations:
    possible_combinations_result_list.append(combination)

for i in possible_combinations_result_list:
    print(i)