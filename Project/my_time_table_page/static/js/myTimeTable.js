

// 크롤링 에시
var TimeTableClass =
[
	['스페인어', '월234'],
	['컴퓨터구조', '화2_수2_목2'],
	['컴퓨터네트워크', '수3_금23'],
	['알고리즘분석', '화5_수5_목5'],
	['프로그래밍언어론', '화9_금56']
];

// 요일 한국어에서 영어로 변환
function KorToEngOfDay(day)
{
	switch (day) {
	case '월':
		return 'mon';
	case '화':
		return 'tue';
	case '수':
		return 'wed';
	case '목':
		return 'thu';
	case '금':
		return 'fri';
	case '토':
		return 'sat';
	case '일':
		return 'sun';
	default:
		return 0;
	}
}

function addClassToTimeTable(TimeTableClass)
{
	// 수업이름
	let className = '';
	// 시간 정보
	let timeList = '';
	// 수업의 요일
	let day = '';
	// 수업의 요일의 시간
	let timeOfDay = '';
	// html에 넣을 id
	let id = '';
	// timeTableClass 각 수업마다, 이름, 시간으로 쪼갠다.
	for(let i=0; i < TimeTableClass.length ;i++)
	{
		className = TimeTableClass[i][0];
		timeList = TimeTableClass[i][1].split("_"); // 월2 화2 수2 이렇게 쪼개진다.
		for (let j = 0; j < timeList.length; j++) // 월234는 한번.
		{
			day = KorToEngOfDay(timeList[j].substr(0,1)); // 월234에서 월 가져온다.
			timeOfDay = timeList[j].substring(1); // 2,3,4 가져온다.
			for (let k = 0; k < timeOfDay.length; k++)
			{
				id = "#timeTable_" + day + "_" + timeOfDay.substr(k,1);
				$(id).text(className);
			}

		}

	}

}

window.onload=function(){
	addClassToTimeTable(TimeTableClass);
}