const db = require('../models')
const asyncHandler = require('express-async-handler')
const { role, category, user, foodType } = require('../ultils/insertdata')
const { body } = require('../rawdata/chothuephongtro.json')
const nhachothue = require('../rawdata/nhachothue.json')
const makeId = require('uniqid')


const insertData = asyncHandler(async (req, res) => {
    await Promise.all([
        db.User.bulkCreate(user),
        db.Role.bulkCreate(role),
        db.Category.bulkCreate(category),
        db.Foodtype.bulkCreate(foodType)
    ])

    return res.json('Done')
})

const fn = async (post) => {
    const uid = makeId()
    const category = ['TNT', 'TQA', 'DVK'].find((el, index) => index === Math.round(Math.random() * 2)) || 'DVK'
    await db.User.create({
        email: makeId() + '@gmail.com',
        pass: '123456',
        role: 'R2',
        name: post?.contact?.content?.find(el => el.name === "Liên hệ:")?.content,
        phone: post?.contact?.content?.find(el => el.name === "Điện thoại:")?.content,
        id: uid
    })
    await db.Post.create({
        title: post?.header?.title,
        price: category === 'TNT' ? Math.round(Math.random() * Math.pow(10, 4)) * 1000 : null,
        images: post?.images,
        address: post?.header?.address,
        postedBy: uid,
        category: category,
        ref: 'Đại học FPT',
        distance: Math.round(Math.random() * 10000),
        area: category === 'TNT' ? Math.round(Math.random() * 300) : null,
        desc: JSON.stringify(post?.mainContent?.content),
        views: Math.round(Math.random() * 1000),
        id: makeId(),
        foodType: category === 'TQA' ? foodType.map(el => el.code).find((el, index) => index === Math.round(Math.random() * 5)) || 'QN' : null
    })
}

const insertRented = asyncHandler(async (req, res) => {
    const promises = []
    for (let i of body.concat(nhachothue.body)) promises.push(fn(i))
    await Promise.all(promises)

    return res.json('Done')
})

module.exports = {
    insertData,
    insertRented
}