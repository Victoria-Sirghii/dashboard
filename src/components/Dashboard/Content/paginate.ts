export const paginate = (data:any) =>{
  const dataPerPage = data.per_page
  const pages = Math.ceil(data.total / dataPerPage)
  const newUsers = Array.from({length: pages}, (_, index) => {
    const start = index * dataPerPage
    // return data.slice()
    console.log(data)
  })
  console.log(pages)
}