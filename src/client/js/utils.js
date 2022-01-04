export function useSearchData(keyword, datas) {
  keyword = keyword.replaceAll(" ", "");
  const result = [];

  datas.forEach(data => {
    if (data.title.replaceAll(" ", "").includes(keyword)) {
      result.push(data);
    }
  })

  return result;
}

export function useFilterData(filterData, datas) {
  if (filterData.selectedItems.length == 0) {
    return datas;
  } else {
    const result = [];
    datas.forEach(data => {
      let include = false;
      for (let skill of data.skills) {
        if (filterData.selectedItems.includes(skill)) {
          include = true;
          break;
        }
      }
      if (include) {
        result.push(data);
      }
    })
    return result;
  }
}

export function formatDate(date){
  return String(new Date(date).toLocaleDateString()).slice(0, -1);
}