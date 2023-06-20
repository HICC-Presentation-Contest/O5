import itertools

group1 = [['스페인어', '월2_월3_월4'], ['컴퓨터구조', '화2_수2_목2'], ['컴퓨터네트워크', '수3_금2_금3']]
group2 = [['알고리즘분석', '화5_수5_목5'], ['프로그래밍언어론', '화9_금5_금6']]
group3 = [['확인용', '월3_월4_월5'], ['확인용2', '화3_목4_목5'], ['확인용3', '화4_수3_수4']]

all_groups = [group1, group2, group3]
# 여기까진 정보 받아옴


possible_combinations = []  # 가능한 모든 조합

# 모든 그룹의 조합을 생성
for combination in itertools.product(*all_groups):
    timetable = []  # 시간표
    valid = True  # 유효성 여부

    # 각 그룹의 과목과 시간표 확인
    for group in combination:
        course, schedule = group
        schedule_list = schedule.split('_')  # 시간표를 개별적인 시간으로 분리

        # 이미 시간표에 해당 시간이 존재하는 경우 중복이므로 유효성을 False로 설정
        if any(time in existing_time for existing_course, existing_time in timetable for time in schedule_list):
            valid = False
            break

        # 해당 과목의 모든 시간표 추가
        for time in schedule_list:
            timetable.append([course, time])

    if valid:
        possible_combinations.append(timetable)

# 가능한 조합을 시간 순서로 정렬
sorted_combinations = sorted(possible_combinations, key=lambda x: (x[0][1:], x[1][1:]))

possible_combinations_sort = []  # 가능한 모든 조합들의 요일별 배열
week = ['월', '화', '수', '목', '금']  # 1주
# 가능한 조합 출력
print("가능한 조합:")
for index, combination in enumerate(sorted_combinations, start=1):
    print(f"조합 {index}:")
    day_schedule = {day: [''] * 12 for day in week}

    for course, time in combination:
        day = time[0]  # 시간표의 첫 번째 문자는 요일을 나타냄
        period = int(time[1:])  # 시간표의 나머지 문자는 교시를 나타냄
        day_schedule[day][period - 1] = course
        possible_combinations_sort.append(day_schedule)

    # 디버깅
    print("  월  화  수  목  금")
    for period in range(12):
        print(f"{period + 1:2d}", end="  ")
        for day in week:
            print(f"{day_schedule[day][period]:<4s}", end="  ")
        print()
    print()