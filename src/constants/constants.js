const DEPARTMENTS = [
    {
      name: "Торговля",
      duties: [
        { name: "Продавать продукт", checkbox_0_0: false },
        { name: "Выставлять цены", checkbox_0_1: false },
        { name: "Смотреть аналитику", checkbox_0_2: false },
      ],
    },
    {
      name: "Производство",
      duties: [
        { name: "Закупать сырье", checkbox_1_0: false },
        { name: "Назначать рабочих", checkbox_1_1: false },
      ],
    },
    {
      name: "Разборки",
      duties: [
        { name: "Дуель", checkbox_2_0: false },
        { name: "Выставлять претензии", checkbox_2_1: false },
      ],
    },
    {
      name: "Управление",
      duties: [
        { name: "Назначать должности", checkbox_3_0: false },
        { name: "Выгонять из банды", checkbox_3_1: false },
      ],
    },
  ];

const TAB_LINKS = {
    HIERARCHY: "Иерархия",
    ROLES: "Должности",
    STAFF_LIST: "Список персонала",
    EQUIPMENT_SET: "Наборы экипировки"
};

export { DEPARTMENTS, TAB_LINKS };