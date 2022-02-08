export default function logger() {
    console.log('Wake up, Neo...')
}

export function loggerSec() {
    console.log('Wake up, Neo... Again...')
}



// const addedChars = async (res) => {

//     деструктуризация динамического импорта, чтобы в дальнейшем пользоваться сущностями
//     const {logger, loggerSec} = await import('./someFunc')
//     logger()
//     loggerSec()

//     let ended = false;
//     if (res.length < 9) {
//         ended = true
//     }
//     setChars(chars => [...chars, ...res])

//     setIsNewCharsLoading(false)
//     setOffset(offset => offset + 9)
//     setCharsEnded(ended)
// }

// if (isLoading) {
//     // динамический импорт всегда возвращает promise с объектом загружаемого модуля
//     import('./someFunc')
//         // если экспорт именованный, мы обращаемся к имени функции
//         // .then(obj => obj.logger())
//         // если экспорт дефолтный, мы обращаемся к дефолту
//         .then(obj => obj.default())
//         .catch(console.log('dynamic import is fail'))
// }