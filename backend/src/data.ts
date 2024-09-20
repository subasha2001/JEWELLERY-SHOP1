import { bannerType, jewelleryType } from "./dataType"

export const jewellers: jewelleryType[] = [
    {
        id: '0',
        name:'Silver Nagas Kudam',
        imageDis:'silverNagasKudam-1-d.jpg',
        imageHov:'silverNagasKudam-1-h.jpg',
        description:'Silver Nagas Kudam',
        category:['kudam'],
        metalType:['silver'],
        weight:46.41,
        makingCost:16,
        wastage:5
    },
    {
        id: '1',
        name:'Enticing Gold Bangle',
        imageDis:'goldBangle-1-d.jpg',
        imageHov:'goldBangle-1-h.jpg',
        description:'A 22KT fancy bangle in yellow gold. It looks lovely in the classic traditional design',
        category:['bangle'],
        metalType:['gold'],
        weight:46.41,
        makingCost:16,
        wastage:5
    },
    {
        id: '2',
        name:'Charming Mother Child Heart Love Pendant',
        imageDis:'motherChiltHeartPendant-d.jpg',
        imageHov:'motherChiltHeartPendant-h.jpg',
        description:'A 22KT yellow gold pendant. Set yourself apart from the rest with this exquisitely designed gold pendant.',
        category:['pendant'],
        metalType:['gold'],
        weight:3.55,
        makingCost:19.12,
        wastage:5
    },
    {
        id: '3',
        name:'Simple And Elegant Gold Earring',
        imageDis:'simpleGoldEaring-1-d.jpg',
        imageHov:'simpleGoldEaring-1-h.jpg',
        description:'A 22KT beautiful pair of earrings in yellow gold. Delicate, light and understated, these earrings make a quiet, yet strong, fashion statement.',
        category:['bangle'],
        metalType:['gold'],
        weight:3.16,
        makingCost:19.2,
        wastage:5
    }
]

export const banner: bannerType[] = [
    {
        id: '0',
        image: 'banner1.webp'
    }
]

export const sample_users:any[] = [
    {
        name: 'Subash',
        email: 'subashinr.is@gmail.com',
        password: 'sub@123',
        address: '3, new police quarters, reserve line, sivakasi',
        isAdmin: true
    },
    {
        name: 'Anand',
        email: 'anand@gmail.com',
        password: 'anand@123',
        address: '4, new police quarters, reserve line, sivakasi',
        isAdmin: true
    },
    {
        name: 'Kathir',
        email: 'kathir@gmail.com',
        password: 'kathir@123',
        address: '5, new police quarters, reserve line, sivakasi',
        isAdmin: true
    }
]