from timetable_algorithm import *


# 원하는 날에 공강이 있는 시간표 재배치
def empty_Day(possible_combinations):
    def day_to_index(day):
        return {'월': 0, '화': 1, '수': 2, '목': 3, '금': 4, '토': 5, '일': 6}[day]

    empty_days_input = input("원하는 날짜 입력: ")
    empty_days = empty_days_input.split(',')
    empty_day_combinations = []

    # True,False 값 불러오기
    for combination in possible_combinations:
        empty_slots, _ = combination
        empty_days_result = []

        # 모두 공강인지 확인
        for day in empty_days:
            day_index = day_to_index(day)
            day_slots = empty_slots[day_index]
            if all(slot == 'True' for slot in day_slots):
                empty_days_result.append(True)
            else:
                empty_days_result.append(False)

        # 해당되는 시간표를 리스트에 추가
        if all(empty for empty in empty_days_result):
            empty_day_combinations.append(combination)

    return empty_day_combinations


empty_day_combinations = empty_Day(possible_combinations)
empty_day_combinations_result_list = []  # 프런트로 보내줄 결과
for empty_slots, combination in empty_day_combinations:
    empty_day_combinations_result_list.append(combination)

for i in empty_day_combinations_result_list:
    print(i)