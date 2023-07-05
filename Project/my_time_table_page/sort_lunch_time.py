# 일주일 중에 3, 4, 5교시에 수업이 없는 날의 개수 확인
def count_free_days(combination):
    free_days = 0
    empty_slots = combination[0]  # 빈 시간 정보 가져오기
    for day in empty_slots:
        if any(period == 'True' for period in day[2:5]):
            free_days += 1
    return free_days


def sort_free_list(result_time_table):


    if not result_time_table:
        return []  # 가능한 조합이 없는 경우 빈 리스트 반환

    result_time_table.sort(key=count_free_days, reverse=True)
    return result_time_table

