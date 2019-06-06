
// const waitToDo = (func,duration=1500)=>{
//   setTimeout(func,duration)
// }



const toastText = (text)=>{
  wx.showToast({title:text,icon:'none'})
}


const toastToDo = (toast) =>{
  wx.showToast({...toast})

  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve()
    },toast.duration?toast.duration:1500)
  })

}


const textmm = function(arg){
  console.log('------------------fefe')
  console.log('arg',arg)
  console.log(arguments)
}

export default {
  toastText,
  toastToDo,
  textmm
}
