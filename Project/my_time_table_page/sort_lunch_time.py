from timetable_algorithm import generate_possible_combinations

# 일주일 중에 3, 4, 5교시에 수업이 없는 날의 개수 확인
def count_free_days(combination):
    free_days = 0
    empty_slots = combination[0]  # 빈 시간 정보 가져오기
    for day in empty_slots:
        if any(period == 'True' for period in day[2:5]):
            free_days += 1
    return free_days


def sort_free_list(all_groups):
    possible_combinations = generate_possible_combinations(all_groups)

    if not possible_combinations:
        return []  # 가능한 조합이 없는 경우 빈 리스트 반환

    possible_combinations.sort(key=count_free_days, reverse=True)
    combinations = [combination for empty_slots, combination in possible_combinations]
    return combinations


all_groups = []  # 입력 그룹 설정

combinations = sort_free_list(all_groups)
