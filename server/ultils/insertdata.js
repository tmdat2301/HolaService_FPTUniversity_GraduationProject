const genId = require('uniqid')

const role = [
    {
        code: 'R1',
        value: 'Admin'
    },
    {
        code: 'R2',
        value: 'Host'
    },
    {
        code: 'R3',
        value: 'Thành viên '
    },
]

const category = [
    {
        code: 'TNT',
        value: 'Thuê nhà trọ',
        slug: 'Thuê nhà trọ',
        image: 'https://vntopfood.com/wp-content/uploads/2021/08/Phong-tro-gan-day.jpg',
        header: 'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất',
        subheader: 'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2022. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.'
    },
    {
        code: 'TQA',
        value: 'Tìm quán ăn',
        slug: 'Tìm quán ăn',
        image: 'http://cdn.tgdd.vn/Files/2020/12/11/1313109/tong-hop-nhung-quan-an-ngon-o-khu-trung-son-huyen-binh-chanh-202202141342217180.jpg',
        header: 'Giới thiệu các quán ăn, Giá Rẻ, Tiện Nghi, Ngon Nhất',
        subheader: 'Giới thiệu tất cả các quán ăn giá rẻ, quán ăn sạch, view đẹp và ngon.'
    },
    {
        code: 'DVK',
        value: 'Dịch vụ khác',
        slug: 'Dịch vụ khác',
        image: 'https://statics.vinpearl.com/rach-gia-co-gi-choi-1_1635413925.jpg',
        header: 'Giới thiệu các dịch vụ khác',
        subheader: 'Giới thiệu các dịch vụ khác, có thể bạn đang cần.'
    },
]

const user = [
    {
        name: 'Nguyễn A',
        email: 'email 1',
        pass: '123456',
        role: 'R1',
        id: genId()
    },
    {
        name: 'Nguyễn B',
        email: 'email 2',
        pass: '123456',
        role: 'R2',
        id: genId()
    },
    {
        name: 'Nguyễn C',
        email: 'email 3',
        pass: '123456',
        role: 'R3',
        id: genId()
    },
]
const foodType = [
    {
        code: 'QA',
        value: 'Quán ăn'
    },
    {
        code: 'TS',
        value: 'Trà sữa'
    },
    {
        code: 'LA',
        value: 'Lẩu'
    },
    {
        code: 'QN',
        value: 'Quán nhậu'
    },
    {
        code: 'BF',
        value: 'Buffet'
    },
    {
        code: 'AV',
        value: 'Ăn vặt'
    },
]

module.exports = {
    user,
    role,
    category,
    foodType
}