
    // ширина экрана
    const Max_Width_Screen = 1280;
    const Center_Width_Screen = 990;
    const Mobile_Width_Screen = 768;

    // общее колич-во карточек к показу на экране при разной ширине
    const Number_Сards_Max = 16; // на 1280 и больше по 4 шт в ряд
    const Number_Сards_Center = 12; // на 1279-990 по  3 шт в ряд
    const Number_Сards_Middle = 8; // на 989-768 по 2шт в ряд
    const Number_Сards_Mobile = 5; // от 767 по 1 шт в ряд


    // количество добавляемых карточек по кнопке "ещё"
    const Add_Cards_Max = 4; // больше 1280 и выше
    const Add_Cards_Middle = 3; // от 1279 до 990
    const Add_Cards_Mobile = 2; // от 989 и меньше

    export {
        Max_Width_Screen,
        Center_Width_Screen,
        Mobile_Width_Screen,
        
        Number_Сards_Max,
        Number_Сards_Center,
        Number_Сards_Middle,
        Number_Сards_Mobile,

        Add_Cards_Max,
        Add_Cards_Middle,
        Add_Cards_Mobile
    };