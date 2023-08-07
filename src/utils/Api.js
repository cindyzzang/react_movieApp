export async function fetchDailyBoxOffice(dateData) {
    const response = await fetch(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=de7816a233ab3abe2ec92149df1f5974&targetDt=${dateData}`
    );
    const data = await response.json();
    return data.boxOfficeResult.dailyBoxOfficeList;
}

export async function fetchWeeklyBoxOffice(dateData) {
    const response = await fetch(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?weekGb=0&key=de7816a233ab3abe2ec92149df1f5974&targetDt=${dateData}`
    );
    const data = await response.json();
    return {
        movies: data.boxOfficeResult.weeklyBoxOfficeList,
        range: data.boxOfficeResult.showRange,
    };
}