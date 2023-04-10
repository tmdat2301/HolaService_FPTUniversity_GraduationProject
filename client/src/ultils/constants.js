import icons from "./icons";
import path from "./path";
export const underMap = [
  'Bạn đang xem nội dung tin đăng: "',
  '". Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.',
];

export const attention = [
  "Nội dung phải viết bằng tiếng Việt có dấu",
  "Tiêu đề tin không dài quá 100 kí tự",
  "Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.",
  "Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.",
  "Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!",
];
export const text = {
  image: "https://phongtro123.com/images/support-bg.jpg",
  content: "Liên hệ với chúng tôi nếu bạn cần hỗ trợ:",
  contacts: [
    {
      text: "HỖ TRỢ THANH TOÁN",
      phone: "Điện thoại: 0917686101",
      zalo: "Zalo: 0917686101",
    },
    {
      text: "HỖ TRỢ ĐĂNG TIN",
      phone: "Điện thoại: 0902657123",
      zalo: "Zalo: 0902657123",
    },
    {
      text: "HOTLINE 24/7",
      phone: "Điện thoại: 0917686101",
      zalo: "Zalo: 0917686101",
    },
  ],
};
export const intro = {
  title: "Tại sao lại chọn  HoLaService.com?",
  description:
    "Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng HolaService.com tự hào là trang web đầu tiên và thuận tiện nhất giúp các bạn sinh viên, mọi người đang sinh sống và làm việc tại cơ sở Hoà Lạc dễ dàng tham khảo, tìm kiếm và lựa chọn các dịch vụ tốt nhất.",
  description2:
    "Đối với những người bán hàng, cung cấp dịch vụ có thể đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn",
  statistic: [
    {
      name: "Thành viên",
      value: "116.998+",
    },
    {
      name: "Tin đăng",
      value: "103.348+",
    },
    {
      name: "Lượt truy cập/tháng",
      value: "300.000+",
    },
    {
      name: "Lượt xem/tháng",
      value: "2.500.000+",
    },
  ],
  price: "Chi phí thấp, hiệu quả tối đa",
  comment:
    '"Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."',
  author: "Anh Khánh (chủ hệ thống phòng trọ tại xã Thạch Hoà)",
  question: "Bạn đang có phòng trọ / căn hộ cho thuê?",
  answer: "Không phải lo tìm người cho thuê, phòng trống kéo dài",
};

const {
  ImPencil2,
  MdGroups2,
  TbLayoutDashboard,
  MdOutlineOtherHouses,
  FaStoreAlt,
  SiYourtraveldottv,
  AiOutlineUser,
} = icons;

export const memuSidebar = [
  {
    id: 1,
    text: "Tổng quan",
    path: "/" + path.ADMIN + "/" + path.DASHBOARD,
    icon: <TbLayoutDashboard size={24} />,
  },
  {
    id: 7,
    text: "Tạo bài đăng",
    path: "/" + path.ADMIN + "/" + path.CREATE_POST,
    icon: <ImPencil2 size={18} />,
  },
  {
    id: 2,
    text: "Quản lý thuê trọ",
    path: "/" + path.ADMIN + "/" + path.MANAGE_RENTED,
    icon: <MdOutlineOtherHouses size={24} />,
  },
  {
    id: 3,
    text: "Quản lý quán ăn",
    path: "/" + path.ADMIN + "/" + path.MANAGE_EATERY,
    icon: <FaStoreAlt size={24} />,
  },
  {
    id: 5,
    text: "Quản lý dịch vụ khác",
    path: "/" + path.ADMIN + "/" + path.MANAGE_OTHERS,
    icon: <SiYourtraveldottv size={24} />,
  },
  {
    id: 4,
    text: "Quản lý thành viên",
    path: "/" + path.ADMIN + "/" + path.MANAGE_USER,
    icon: <MdGroups2 size={24} />,
  },
  {
    id: 9,
    text: "Thông tin cá nhân",
    path: "/" + path.ADMIN + "/" + path.PERSONAL,
    icon: <AiOutlineUser size={24} />,
  },
];
export const prices = [
  {
    min: 0,
    max: 1000000,
    value: "Dưới 1 triệu",
  },
  {
    min: 1000000,
    max: 2000000,
    value: "Từ 1 - 2 triệu",
  },
  {
    min: 2000000,
    max: 3000000,
    value: "Từ 2 - 3 triệu",
  },
  {
    min: 3000000,
    max: 5000000,
    value: "Từ 3 - 5 triệu",
  },
  {
    min: 5000000,
    max: 7000000,
    value: "Từ 5 - 7 triệu",
  },
  {
    min: 7000000,
    max: 10000000,
    value: "Từ 7 - 10 triệu",
  },
  {
    min: 10000000,
    max: 15000000,
    value: "Từ 10 - 15 triệu",
  },
  {
    min: 15000000,
    max: Math.pow(10, 9),
    value: "Trên 15 triệu",
  },
];

export const areas = [
  {
    min: 0,
    max: 20,
    value: "Dưới 20m",
  },
  {
    min: 20,
    max: 30,
    value: "Từ 20m - 30m",
  },
  {
    min: 30,
    max: 50,
    value: "Từ 30m - 50m",
  },
  {
    min: 50,
    max: 70,
    value: "Từ 50m - 70m",
  },
  {
    min: 70,
    max: 90,
    value: "Từ 70m - 90m",
  },
  {
    min: 90,
    max: 9999999,
    value: "Trên 90m",
  },
];
export const distances = [
  {
    min: 0,
    max: 100,
    value: "Dưới 100m",
  },
  {
    min: 100,
    max: 500,
    value: "Từ 100m - 500m",
  },
  {
    min: 500,
    max: 1000,
    value: "Từ 500m - 1km",
  },
  {
    min: 1000,
    max: 2000,
    value: "Từ 1km - 2km",
  },
  {
    min: 2000,
    max: 5000,
    value: "Từ 2km - 5km",
  },
  {
    min: 5000,
    max: 999999999,
    value: "Trên 5km",
  },
];
export const memuSidebarMember = [
  {
    id: 1,
    text: "Thông tin cá nhân",
    path: "/" + path.MEMBER + "/" + path.PERSONAL,
    icon: <AiOutlineUser size={24} />,
  },
  {
    id: 7,
    text: "Tạo bài đăng",
    path: "/" + path.MEMBER + "/" + path.CREATE_POST,
    icon: <ImPencil2 size={18} />,
    role: "R3",
  },
  {
    id: 2,
    text: "Quản lý thuê trọ",
    path: "/" + path.MEMBER + "/" + path.MANAGE_RENTED,
    icon: <MdOutlineOtherHouses size={24} />,
    role: "R3",
  },
  {
    id: 3,
    text: "Quản lý quán ăn",
    path: "/" + path.MEMBER + "/" + path.MANAGE_EATERY,
    icon: <FaStoreAlt size={24} />,
    role: "R3",
  },
  {
    id: 5,
    text: "Quản lý dịch vụ khác",
    path: "/" + path.MEMBER + "/" + path.MANAGE_OTHERS,
    icon: <SiYourtraveldottv size={24} />,
    role: "R3",
  },
];
export const foodType = [
  {
    code: "QA",
    value: "Quán ăn",
  },
  {
    code: "TS",
    value: "Trà sữa",
  },
  {
    code: "LA",
    value: "Lẩu",
  },
  {
    code: "QN",
    value: "Quán nhậu",
  },
  {
    code: "BF",
    value: "Buffet",
  },
  {
    code: "AV",
    value: "Ăn vặt",
  },
];

export default memuSidebar;
