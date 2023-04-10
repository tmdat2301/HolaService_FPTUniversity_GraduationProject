import icons from "./icons"
export const formatVietnameseToString = (keyword) => {
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
}

const validate = (payload, setInvalidFields) => {
    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
        if (item[1] === '') {
            setInvalidFields(prev => [...prev, {
                name: item[0],
                message: 'Bạn không được bỏ trống trường này.'
            }])
            invalids++
        }
    })
    fields.forEach(item => {
        switch (item[0]) {
            case 'password':
                if (item[1].length < 6) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
                    }])
                    invalids++
                }
                break;
            case 'phone':
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Số điện thoại không hợp lệ.'
                    }])
                    invalids++
                }
                break
            case 'priceNumber':
            case 'areaNumber':
                if (+item[1] === 0) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Chưa đặt giá trị cho trường này.'
                    }])
                    invalids++
                }
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Trường này phải là số.'
                    }])
                    invalids++
                }
                break

            default:
                break;
        }
    })
    return invalids
}
export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const { AiFillStar } = icons
export const renderStar = (number) => {
    if (number > 5) number = 5
    const stars = []
    for (let i = 0; i < number; i++) stars.push(<AiFillStar size={16} color='#f59e0b' />)
    for (let i = number; i < 5; i++) stars.push(<AiFillStar size={16} />)

    return stars
}
export const getNumbersPrice = (string) => string.split(' ').map(item => +item).filter(item => !item === false)
export const getNumbersArea = (string) => string.split(' ').map(item => +item.match(/\d+/)).filter(item => item !== 0)
export const convert100toTarget = (percent, type) => {
    switch (type) {
        case 'price':
            return Math.round(percent * 150000 / 1000000) * 1000000
        case 'distance':
            return percent * 50
        case 'area':
            return Math.ceil(percent * 0.09) * 10

        default:
            return 0;
    }
}
export function getDaysInMonth(customTime, number) {
    const endDay = new Date(customTime)?.getDate() || new Date().getDate()
    const days = number || 15
    const endPreviousMonth = new Date(new Date(customTime)?.getFullYear(), new Date(customTime)?.getMonth(), 0).getDate()
    let day = 1
    let prevDayStart = 1
    const daysInMonths = []
    while (prevDayStart <= +endPreviousMonth) {
        const month = new Date().getMonth()
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${prevDayStart < 10 ? '0' + prevDayStart : prevDayStart}-${month < 10 ? `0${month}` : month}-${year}`)
        prevDayStart += 1
    }
    while (day <= +endDay) {
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${day < 10 ? '0' + day : day}-${month < 10 ? `0${month}` : month}-${year}`)
        day += 1
    }
    return daysInMonths.filter((el, index, self) => index > self.length - days - 2)
}
export function getMonthInYear(customTime, number) {
    const endMonth = new Date(customTime?.to).getMonth() + 1 || new Date().getMonth() + 1
    let month = 1
    const months = number || 8
    let startLastYear = 1
    const daysInMonths = []
    while (startLastYear <= 12) {
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${startLastYear < 10 ? `0${startLastYear}` : startLastYear}-${year - 1}`)
        startLastYear += 1
    }
    while (month <= +endMonth) {
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${month < 10 ? `0${month}` : month}-${year}`)
        month += 1
    }
    return daysInMonths.filter((el, index, self) => index > self.length - months - 2)
}
export const getDaysInRange = (start, end) => {
    const startDateTime = new Date(start).getTime()
    const endDateTime = new Date(end).getTime()
    return (endDateTime - startDateTime) / (24 * 60 * 60 * 1000)
}
export const getMonthsInRange = (start, end) => {
    let months;
    const d1 = new Date(start)
    const d2 = new Date(end)
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months
}

export default validate