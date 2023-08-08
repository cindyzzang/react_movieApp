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

export async function getMovieData(movieName,openDate) {
    const response = await fetch(
        `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=IXI939389P5J03DNHZ78&title=${movieName}&releaseDts=${openDate.replace(/-/g,"")}`
    );
    const data = await response.json();
    return data
}
