import AllCtx from "@/util-functions/allCtx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { HiBell, HiChevronDoubleRight, HiOutlineClock } from "react-icons/hi";
import { IoFlash, IoFlashOutline } from "react-icons/io5";
import AuctionsCountdown from "../countdowns/AuctionsCountdown";
import { useRouter } from "next/router";
import secureLocalStorage from "react-secure-storage";

function AuctionLots() {
  const router = useRouter();
  const {
    setAuctionLots,
    auctionLots,
    formatDate,
    setAuctionDetails,
    setSelectedAuction,
    setAuctionNotificationOverlay,
    showPlaceBidOverlay,
  } = AllCtx();
  const [fetching, setFetching] = useState(false);
const STATICE_AUCTIONS =  [
  {
      "auction_id": 11045,
      "auction_title": "Auction #119",
      "auction_description": "Auction 119",
      "auction_start_date": "26/01/2024",
      "auction_start_time": "19:00:00",
      "auction_end_date": "30/01/2024",
      "auction_end_time": "20:40:30",
      "countdown": "06:51:41",
      "countdown_seconds": 24701,
      "items_number_count": 202,
      "auction_lot": "119",
      "auction_max_bids": "203",
      "auction_status": "current",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/c80bd045080014a56110c8867656c1e9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/7dd2f6b5591f219aa14f9184d3268546.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/258c7ebfb0fc12789966209941804dc3.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5ce64c3b8968269319ac806afa23edd6.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/73db84bdc06ff63c0b34ab060bb5fe20.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/2cbedfa6b525ee0d95ce500359c314b0.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f6d5b39dfed2784df3ddd7b0e510a45a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3eac89874ed7bf32e69217c2a77977e0.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f8a6be5800358342195609bff0cb33d9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/41a689d64f086f16bc634fb360226c3c.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/cfac2bfeee1aa2f035778a3120e48287.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/7d9c765bae7c5a0b7852a8592a393f55.jpg"
      ]
  },
  {
      "auction_id": 10484,
      "auction_title": "Auction #118",
      "auction_description": "Auction 118",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:48",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:48",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 323,
      "auction_lot": "118",
      "auction_max_bids": "328",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/2f82b87a64ffea87dc33e313998a32c4.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3ec7a6555a014e484e55c25f266a443e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/292b5e23fb5ffa372eba15fcd60a4e38.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/292b5e23fb5ffa372eba15fcd60a4e38.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/8074ed7b53cd6e1160ba5cc73b0c6ff9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d562c52a8e36cbec571f0bb728c70d34.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b00e194c7db16a6fb9dd8aa0d416d677.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f721a4935e20c564d9563a9470616b1d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/ac36277f9fa2de9aff55d7f48f54095b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/79819b889b8a358624bf94134d49a4bd.png"
      ]
  },
  {
      "auction_id": 10483,
      "auction_title": "Auction #117",
      "auction_description": "Auction 117",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:48",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:48",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 184,
      "auction_lot": "117",
      "auction_max_bids": "185",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/d1759ffa348648f1bd373230aed80fe0.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/1c1e26c5e9e74f1fffc37ab50b0e1e01.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/09cf63f4a0639959d1255db2885d746e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/814e22ce559efd8a7f9c53754c07b1c6.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/814e22ce559efd8a7f9c53754c07b1c6.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/11394ae91e6d047a5edc4bb9bc205d9e.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/45de21af41889615aa45fdd8ab6ef0a4.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/9d699e39a25c96295550135bd503d62c.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/82bf78a4d2c8dd3c2acb0821d110076f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/36b3dad277366d24d751160fe4b7d4a3.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/df6d8ec4f9ffd9eb568adc89a41538d9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/d00e29dd4ecf9bf9b2fbe97ca752d496.jpg"
      ]
  },
  {
      "auction_id": 9951,
      "auction_title": "Auction #116",
      "auction_description": "Auction 116",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:49",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:49",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 202,
      "auction_lot": "116",
      "auction_max_bids": "202",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/254898ee6508a634a59b35cf49acc5b2.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/9cc91073750909b27a3a221b1d6f352f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/e5b25cfd0d61938710440eef6ebb6570.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/02c2c5df36fc15d207703ac1a1e252d1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/a278fe5e48082a2e3b71171ffd92d7e1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/c801085974acf642ce3478bd3d087f7e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/876ccf2251959d68971a7b604b2ca1f3.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/8074ed7b53cd6e1160ba5cc73b0c6ff9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/e94562242363e0938981438a47a44bd3.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/729e5ca5acf19f8f230715104517fa70.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0c91d39f0edbb5d4d0d7c7b08012624a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/39ce4bbec3c7796e9fee33a44f724dbd.jpg"
      ]
  },
  {
      "auction_id": 9950,
      "auction_title": "Auction #115",
      "auction_description": "Auction 115",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:49",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:49",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 324,
      "auction_lot": "115",
      "auction_max_bids": "328",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/99daffd5c4e530e6df1c1f97f4892ff1.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/661239d381fee0e395a662ceae13b8dd.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/50e716449af81a78f82daf569139ec7e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/551634c860f6aa06ab0b4244ebff5dd6.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/48f07ce59d6031667611194f05c9a95b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/022ab1f65203640488e0ec2ffc0294a5.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/bd941ca769c3719f1a48fa2ca95f3094.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/f10f536c97b3ee075b3377531609a2b8.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f6ddc821d1179a70a3e52f5ef2f487bf.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/696e79d116864ff69336dba1db606b72.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/cf42a04898c725b0cd6121c9abdbf6ce.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/4871b7f65bd7e33f3e779b8b78a31a71.jpg"
      ]
  },
  {
      "auction_id": 9765,
      "auction_title": "Auction #114",
      "auction_description": "Auction 114",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:49",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:49",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 184,
      "auction_lot": "114",
      "auction_max_bids": "185",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f8a6be5800358342195609bff0cb33d9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/027e47c35adebc710bcbe0ca22de2d60.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/32fe6b57776cd5a723f61aaa82dd367f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f721a4935e20c564d9563a9470616b1d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/1e83c52aace821df94bb5331e4e2a402.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/02c2c5df36fc15d207703ac1a1e252d1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/6a17b973a01414c2bffcba73801fbb37.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f8a6be5800358342195609bff0cb33d9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/33b3119f86d42df7d793436cdc8cc411.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/269a6f96610b0a91b675351158de45a9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0996fa1085400472255fa3fdf824840e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/ad78117a28eba1572c9f69010cf27005.png"
      ]
  },
  {
      "auction_id": 9566,
      "auction_title": "Auction #113",
      "auction_description": "Auction 113",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:49",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:49",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 197,
      "auction_lot": "113",
      "auction_max_bids": "202",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5c8d64c4c1072d81109561d1a79428b6.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/a65ed55b0dcea4c1a923c2a3fde97f95.jpeg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6e794b26f2071802febaa2c610fda279.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/e462ad74ce9be783ffda0a1655159950.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/eedf87e447403180559b365195576c33.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/829768e1ff56b1732073d312a2c42525.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/ecbab6936ea1d34a114fbb4293952f45.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6b2906139fc10d273d00e0d5634b8837.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/3f12f86a6d5c335ccb857afed8aeafa9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/cde7d59fc9ccbfed39b6a0ee511e98c6.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/d9067856b1c52365d817292d384f08a1.jpg"
      ]
  },
  {
      "auction_id": 9058,
      "auction_title": "Auction #112",
      "auction_description": "Auction 112",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:50",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:50",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 325,
      "auction_lot": "112",
      "auction_max_bids": "328",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/388831bccac83795f08d6280ca9e622c.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/02aacffe4f9dab794f8eb161d5af1dff.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/1f10d35a25ab9f0c996fc14ad3b91327.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/9cc91073750909b27a3a221b1d6f352f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/1a37d040a5d920b80e587bb52305ea6d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/dbf09f53ccdeb01da7536c33a023bb97.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/7e2a40d5b4695069a93c4938922bb155.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/2f82b87a64ffea87dc33e313998a32c4.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/1b731c35d80592c506ffd9637fc1cf86.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3ec7a6555a014e484e55c25f266a443e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/7a598b66a5a842fef246264b2b2e8926.jpg"
      ]
  },
  {
      "auction_id": 9057,
      "auction_title": "Auction #111",
      "auction_description": "Auction 111",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:50",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:50",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 170,
      "auction_lot": "111",
      "auction_max_bids": "171",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/45e40d306aaad52a22816c2f4628d250.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/e25729e3989b02acaa28d0a259d40bc0.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/c44652311d0c7ca5a1b033e5aaaedff1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/86aab42411200478917774d179fe87df.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b101290b41c866c1f3aa8bf761a924ec.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/02aacffe4f9dab794f8eb161d5af1dff.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0996fa1085400472255fa3fdf824840e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/a174794acfd31853fbaf723368d044e3.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/1b58b4d6c036e79b30101367d9d5deec.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3eac89874ed7bf32e69217c2a77977e0.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3b8b4670f66457f1ec8b2e7b8e0ccf9e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5569437c8a7c3721e0cd982748d845fb.png"
      ]
  },
  {
      "auction_id": 8856,
      "auction_title": "Auction #110",
      "auction_description": "Auction 110",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:50",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:50",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 200,
      "auction_lot": "110",
      "auction_max_bids": "200",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5c8d64c4c1072d81109561d1a79428b6.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/a65ed55b0dcea4c1a923c2a3fde97f95.jpeg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6e794b26f2071802febaa2c610fda279.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/e462ad74ce9be783ffda0a1655159950.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/eedf87e447403180559b365195576c33.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/829768e1ff56b1732073d312a2c42525.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/ecbab6936ea1d34a114fbb4293952f45.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6b2906139fc10d273d00e0d5634b8837.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/3f12f86a6d5c335ccb857afed8aeafa9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/cde7d59fc9ccbfed39b6a0ee511e98c6.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/d9067856b1c52365d817292d384f08a1.jpg"
      ]
  },
  {
      "auction_id": 8458,
      "auction_title": "Auction #109",
      "auction_description": "Auction 109",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:51",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:51",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 323,
      "auction_lot": "109",
      "auction_max_bids": "328",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/9cc91073750909b27a3a221b1d6f352f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d562c52a8e36cbec571f0bb728c70d34.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/a6f6911059f2d8d6bbf066f38d497095.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/eac000c65a1d1eb57328224f0b45460b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f8a6be5800358342195609bff0cb33d9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f721a4935e20c564d9563a9470616b1d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/2561915857a81f2f8407d32921a4b221.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/c54a9d5cf15c6bd3d3d92d98b808408a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5b4a3081197d6456752e808e58f775b8.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0996fa1085400472255fa3fdf824840e.jpg"
      ]
  },
  {
      "auction_id": 8355,
      "auction_title": "Auction #108",
      "auction_description": "Auction 108",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:51",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:51",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 172,
      "auction_lot": "108",
      "auction_max_bids": "171",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/45e40d306aaad52a22816c2f4628d250.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/ecbab6936ea1d34a114fbb4293952f45.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/45e40d306aaad52a22816c2f4628d250.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/e25729e3989b02acaa28d0a259d40bc0.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/c44652311d0c7ca5a1b033e5aaaedff1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/86aab42411200478917774d179fe87df.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b101290b41c866c1f3aa8bf761a924ec.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/02aacffe4f9dab794f8eb161d5af1dff.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0996fa1085400472255fa3fdf824840e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/a174794acfd31853fbaf723368d044e3.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/1b58b4d6c036e79b30101367d9d5deec.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3eac89874ed7bf32e69217c2a77977e0.jpg"
      ]
  },
  {
      "auction_id": 8089,
      "auction_title": "Auction #107",
      "auction_description": "Amazing items",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:51",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:51",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 201,
      "auction_lot": "107",
      "auction_max_bids": "200",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/02c2c5df36fc15d207703ac1a1e252d1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/c44652311d0c7ca5a1b033e5aaaedff1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/2ef90462566b2f13f93e9aee5ccdb17b.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/f6bdfd63c93bc2d14a79708a95946886.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/73be2433be788eab2562812c416642a2.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/88b89ed3cdb6b21030ff240b30c5842c.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/9cc91073750909b27a3a221b1d6f352f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/fed0d4e94928f8b8db1e8c413a043496.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b63c567247c0dc9582bddd9de236f796.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5569437c8a7c3721e0cd982748d845fb.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/1a72278c2173efc9a7fcff1aba1e9548.jpg"
      ]
  },
  {
      "auction_id": 7763,
      "auction_title": "Auction #106",
      "auction_description": "Auction 106",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:52",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:52",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 324,
      "auction_lot": "106",
      "auction_max_bids": "328",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/9cc91073750909b27a3a221b1d6f352f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d562c52a8e36cbec571f0bb728c70d34.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/a6f6911059f2d8d6bbf066f38d497095.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/eac000c65a1d1eb57328224f0b45460b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f8a6be5800358342195609bff0cb33d9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f721a4935e20c564d9563a9470616b1d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/2561915857a81f2f8407d32921a4b221.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/c54a9d5cf15c6bd3d3d92d98b808408a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/5b4a3081197d6456752e808e58f775b8.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0996fa1085400472255fa3fdf824840e.jpg"
      ]
  },
  {
      "auction_id": 7576,
      "auction_title": "Auction #105",
      "auction_description": "Nice items for the festive holiday.",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:52",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:52",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 181,
      "auction_lot": "105",
      "auction_max_bids": "180",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/dfed1c6f2bde984f6bf5c4c78881b306.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f8a6be5800358342195609bff0cb33d9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/e462ad74ce9be783ffda0a1655159950.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b63c567247c0dc9582bddd9de236f796.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f721a4935e20c564d9563a9470616b1d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0996fa1085400472255fa3fdf824840e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/70ba09e3d997eebcef6a20aeff4e3a2f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6fb64d621511ce33cc8b335260243eb9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d562c52a8e36cbec571f0bb728c70d34.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b00e194c7db16a6fb9dd8aa0d416d677.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/33b3119f86d42df7d793436cdc8cc411.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d720d72f948efe093f51fa8805fa471f.png"
      ]
  },
  {
      "auction_id": 7270,
      "auction_title": "Auction #104",
      "auction_description": "Auction lot 104",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:52",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:52",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 155,
      "auction_lot": "104",
      "auction_max_bids": "139",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/2f82b87a64ffea87dc33e313998a32c4.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/4168fe39faf34344ec4c4407bbc467ef.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/3ec7a6555a014e484e55c25f266a443e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/3de16b2555e576f354c44a244123182b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/292b5e23fb5ffa372eba15fcd60a4e38.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/3f12f86a6d5c335ccb857afed8aeafa9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/fd2ab351bc000fa46b46eeb91524195f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b00e194c7db16a6fb9dd8aa0d416d677.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg"
      ]
  },
  {
      "auction_id": 7068,
      "auction_title": "Auction #103",
      "auction_description": "NO RETURNS. ALL SALES ARE FINAL UNLESS THE ITEM IS MISREPRESENTED, IF SO, YOU MAY RETURN IT FOR STORE CREDIT.\n\n15% buyer's Premium will be added to the final price.\n\nAfter winning an item you can schedule an appointment for pick up online or have it delivered to you for a fee. \n\nMust pick up items within 7 days of auction end.\n\nHappy Bidding!\n",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:52",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:52",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 199,
      "auction_lot": "103",
      "auction_max_bids": "200",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/62d7f178ce1d3547207c66a39e8869f3.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0c91d39f0edbb5d4d0d7c7b08012624a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/70ba09e3d997eebcef6a20aeff4e3a2f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/8074ed7b53cd6e1160ba5cc73b0c6ff9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/02c2c5df36fc15d207703ac1a1e252d1.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/269a6f96610b0a91b675351158de45a9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d2dc7056f36d449dcb1d795756d88e65.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6181c41c43ddc4e70025049590552150.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/ac36277f9fa2de9aff55d7f48f54095b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/4871b7f65bd7e33f3e779b8b78a31a71.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d562c52a8e36cbec571f0bb728c70d34.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d873def545c0758af365a02531932900.png"
      ]
  },
  {
      "auction_id": 6891,
      "auction_title": "Auction #101",
      "auction_description": "lots of new items",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:53",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:53",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 75,
      "auction_lot": "101",
      "auction_max_bids": "75",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/9836da870ffb617dd9c3f711c7fa4bf5.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/f5cd80e396b6625470ebd2f06e951e1a.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/c3611416e6836f29ab08714f5a6c0ab4.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/f721a4935e20c564d9563a9470616b1d.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/c54a9d5cf15c6bd3d3d92d98b808408a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/a3199dec12e8d780be97a571ffbe27ed.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0c91d39f0edbb5d4d0d7c7b08012624a.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/a65ed55b0dcea4c1a923c2a3fde97f95.jpeg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b00e194c7db16a6fb9dd8aa0d416d677.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/70ba09e3d997eebcef6a20aeff4e3a2f.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6fb64d621511ce33cc8b335260243eb9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/4871b7f65bd7e33f3e779b8b78a31a71.jpg"
      ]
  },
  {
      "auction_id": 6854,
      "auction_title": "Auction #102",
      "auction_description": "Lorem Ipsum",
      "auction_start_date": "30-01-2024",
      "auction_start_time": "13:48:53",
      "auction_end_date": "30-01-2024",
      "auction_end_time": "13:48:53",
      "countdown": "not-started",
      "countdown_seconds": "not-started",
      "items_number_count": 95,
      "auction_lot": "102",
      "auction_max_bids": "100",
      "auction_status": "upcoming",
      "bid_images": [
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/0920b8808dac7035e75272cdfed491c9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/501add62369c010d980a065614f8dc3e.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/292b5e23fb5ffa372eba15fcd60a4e38.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/11/661239d381fee0e395a662ceae13b8dd.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/8074ed7b53cd6e1160ba5cc73b0c6ff9.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/6fb64d621511ce33cc8b335260243eb9.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/b00e194c7db16a6fb9dd8aa0d416d677.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/a59617ed9267bc7d7b191a8e5fec5173.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/d562c52a8e36cbec571f0bb728c70d34.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/c3611416e6836f29ab08714f5a6c0ab4.jpg",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/2b36c936445ca57b88128388694a6d2b.png",
          "https://api.bidclovercloud.com/wp-content/uploads/2023/12/3de16b2555e576f354c44a244123182b.png"
      ]
  }
]
  // //>Fetch lots
  useEffect(() => {
    // setAuctionLots(STATICE_AUCTIONS)
    async function fetchData() {
      try {
        // setLoginResponse("Please wait... ");
        setFetching(true);
        // console.log("yyyyy");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NEW_API_BASE}/get-auction`,
          {
            cache: 'no-store',
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.warn("ldldldl");
        const data = await response.json();

        if (data.status === "fail") {
          // setLoginResponse(data.message);
          // console.log(data);
          console.log("An error occurred.");
          // setFetching(false);
          return;
        }

        if (!response.ok) {
          // setLoginResponse("Something went wrong, retry!");
          // console.log(data);
          console.log("Response not OK");
          // console.log(data);
          // setFetching(false);
          return;
        }
        // console.log(data.auctions);
        // setFetching(false);
        // return;

        const current_auctions = data.auctions.filter(
          (auction) => auction.auction_status === "current"
        );

        setAuctionLots(current_auctions);
        // setDuplicatedOngoingBids(data.bids);

        // setFetching(false);
      } catch (error) {
        // console.log(error);
        console.log("An error occurred.");
        // setLoginResponse("An error occurred, retry.");
        // setFetching(false);
      }
    }
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      // console.log("This code runs in an interval");
    }, 10000); // 10,000 milliseconds = 10 secs

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [setAuctionLots]);

  return (
    <div className="mtt-y4 sm:mtr-32 mt-5">
      {/*//> Heading */}
      <div className="flex justify-between items-center ">
        <p className="text-[1.375rem] sm:text-[2.12rem] font-semibold ">
          Available Auction Lots
        </p>
        {/* <div className="select-none cursor-pointer flex items-center gap-2 ">
          <p className="text-base sm:text-2xl text-pry-color">See all</p>
          <HiChevronDoubleRight className="w-[1.1rem] h-[1.1rem] sm:w-6 sm:h-6 text-pry-color" />
        </div> */}
      </div>

      {/* //> Auction list */}
      {fetching && auctionLots.length === 0 && (
        <p>Loading auctions... Please wait.</p>
      )}
      {!fetching && auctionLots.length === 0 && (
        <p className="text-red-600">No available auctions at this time.</p>
      )}
      {auctionLots.length > 0 && (
        <div className="duration-300  grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-y-5 sm:gap-16 mt-7  ">
          {auctionLots
            .map((auction, i) => (
              <div
                key={auction.auction_id}
                className="   rounded-lg  cursor-pointer  duration-300 "
              >
                {/* //> Auction heading */}
                <div className="p-4 bg-pry-color text-white rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-xs sm:text-base ">
                      <span className="underline decoration-2 underline-offset-8">
                        PRE-IN
                      </span>
                      SPECTED
                    </p>

                    <div className="flex text-sm sm:text-base items-center gap-x-2">
                      {/* <FaCalendar className="w-4 h-4 text-white" /> */}
                      {formatDate(auction.auction_end_date)}
                    </div>
                  </div>

                  {/* //> */}
                  <p className="mt-2 text-lg sm:text-2xl font-extrabold">
                    AUCTION {auction.auction_lot}
                  </p>
                </div>

                <div className="border-x border-b rounded-b-lg border-pry-color">
                  {/* //> */}
                  <div className="flex justify-end items-center px-4">
                    <div className="flex justify-center items-center p-4 bg-pry-color rounded-3xl -mt-11">
                      <div
                        onClick={() => {
                          setAuctionNotificationOverlay(true);
                        }}
                        className="w-fit h-fit rounded-full  flex justify-center items-center p-2 border border-white cursor-pointer bg-pry-color"
                      >
                        <HiBell className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* //> */}
                  {/* <div className="flex justify-center items-center -mt-10">
                    <div className=" border border-pry-color px-6 py-2 justify-center rounded-full bg-[#eafff0] text-pry-color flex items-center gap-x-2 ">
                      <p className=" text-sm  sm:text-base">Bidding Open</p>
                      <IoFlash className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div> */}

                  {/* //> */}
                  <div
                    className={`grid grid-cols-6 sm:grid-cols-3 place-items-center gap-2 mt-2  px-2 `}
                  >
                    {auction?.bid_images &&
                      auction?.bid_images
                        .concat(
                          Array(
                            Math.max(6 - auction?.bid_images.length, 0)
                          ).fill(0)
                        )
                        .slice(0, 6)
                        .map((item, i) => (
                          <div
                            key={item.id}
                            className="relative w-[50px] sm:w-[70px] flex justify-center items-center   h-[50px] sm:h-[70px]"
                          >
                            <Image
                              //unoptimized={item.includes("amazon" ? true : false)}
                              unoptimized
                              className={`${
                                i > 5 ? "sm:hidden" : ""
                              } rounded-md`}
                              src={item || "/images/pot.png"}
                              alt={i}
                              // width={100}
                              // height={70}
                              fill
                            />
                          </div>
                        ))}
                  </div>

                  {/* //> */}
                  <div className="flex justify-center items-center mt-2">
                    <button
                      onMouseOver={() => {
                        setSelectedAuction(auction);
                        secureLocalStorage.setItem("selectedAuction", auction);
                      }}
                      onTouchStart={() => {
                        setSelectedAuction(auction);

                        secureLocalStorage.setItem("selectedAuction", auction);
                      }}
                      onClick={() => {
                        router.push("/auction-details");
                      }}
                      className="w-[80%]   border flex items-center justify-center px-[7.5rm] py-[0.9rem] sm:py-4 rounded-md text-pry-color duration-300 hover:bg-gray-50 gap-x-2 text-xs sm:text-base font-bold"
                    >
                      {" "}
                      <IoFlashOutline className="w-5 h-5 text-pry-color  " />{" "}
                      View all Items
                    </button>
                  </div>

                  {/* //> */}
                  <div className="flex justify-center items-center my-2 sm:my-4 gap-x-3">
                    {auction.countdown !== "not-started" &&
                      auction.countdown !== "ended" && (
                        <p className="text-gray-600 text-sm sm:text-base font-medium ">
                          CLOSES IN
                        </p>
                      )}

                    {!showPlaceBidOverlay && (
                      <AuctionsCountdown
                        serverCountdownInSeconds={auction.countdown_seconds}
                        serverCountdownHHMMSS={auction.countdown}
                      />
                    )}
                    {/* <AuctionsCountdown serverCountdownInSeconds="02:23:30" /> */}
                  </div>
                </div>
              </div>
            ))
            .filter((bid, i) => i < 10)}
        </div>
      )}
    </div>
  );
}

export default AuctionLots;
