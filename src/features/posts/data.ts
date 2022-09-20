import { FeatureContent } from "../../components/Features";
import { Testimonial } from "../../components/Testimonials";

export const heroInfo = {
  title: "Развивайте гибкие навыки",
  subtitle:
    "Улучшайте результаты во всех сферах жизни с помощью регулярной практики гибких навыков в онлайн-формате. Курсы, статьи и онлайн-тренажеры по научно-доказанным методологиям",
  btn1Text: "Начать",
  btn2Text: "Подробности",
  imgSrc:
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
};

export const featureContent: FeatureContent = {
  title: "Возможности платформы SoftSkillz",
  subtitle:
    "Гибкие навыки - один из ключевых факторов продвижения по карьере, залог хороших отношений с друзьями и в семье",
  features: [
    {
      title: "Регулярная практика",
      body: "Существует множество замечательных книг по любой теме - от переговоров до популярной психологии. Проблема в том, что чтение книг не помогает. Чтобы сформировать навыки, требуются тренировки. Мы помогаем любому человеку тренироваться каждый день и чувствовать прогресс",
    },
    {
      title: "Надежные инструменты",
      body: "В интернете огромное количество непроверенной информации, которая может навредить. Мы тщательно подходим к подготовке маетриалов и онлайн тренажеров и используем только научно-доказанные подходы",
    },
    {
      title: "Бесплатно",
      body: "Тренинги по гибким навыком стоят от нескольких десятков до нескольких сотен тысяч рублей за три месяца. Наша миссия - помочь всем желающим развиваться независимо от финансового положения",
    },
  ],
};

export const testimonialsContent: Testimonial[] = [
  {
    emphasized:
      "I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny's worth.",
    body: "I was an EMT for many years before I joined the bootcamp. I've been looking to make a transition and have heard some people who had an amazing experience here. I signed up for the free intro course and found it incredibly fun! I enrolled shortly thereafter. The next 12 weeks was the best - and most grueling - time of my life. Since completing the course, I've successfully switched careers, working as a Software Engineer at a VR startup.",
    color: "purple",
    author: {
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Daniel Clifford",
      position: "Verified Graduate",
    },
  },
  {
    emphasized: "The team was very supportive and kept me motivated",
    body: "I started as a total newbie with virtually no coding skills. I now work as a mobile engineer for a big company. This was one of the best investments I've made in myself.",
    color: "green",
    author: {
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Jonathan Walters",
      position: "Verified Graduate",
    },
  },
  {
    emphasized: "An overall wonderful and rewarding experience",
    body: "Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love.",
    color: "",
    author: {
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Jeanette Harmon",
      position: "Verified Graduate",
    },
  },
  {
    emphasized:
      "Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.",
    body: "The staff seem genuinely concerned about my progress which I find really refreshing. The program gave me the confidence necessary to be able to go out in the world and present myself as a capable junior developer. The standard is above the rest. You will get the personal attention you need from an incredible community of smart and amazing people.",
    color: "blue",
    author: {
      avatar:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Patrick Abrahms",
      position: "Verified Graduate",
    },
  },
  {
    emphasized: "Such a life-changing experience. Highly recommended!",
    body: "Before joining the bootcamp, I've never written a line of code. I needed some structure from professionals who can help me learn programming step by step. I was encouraged to enroll by a former student of theirs who can only say wonderful things about the program. The entire curriculum and staff did not disappoint. They were very hands-on and I never had to wait long for assistance. The agile team project, in particular, was outstanding. It took my learning to the next level in a way that no tutorial could ever have. In fact, I've often referred to it during interviews as an example of my developent experience. It certainly helped me land a job as a full-stack developer after receiving multiple offers. 100% recommend!",
    color: "",
    author: {
      avatar:
        "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Kira Whittle",
      position: "Verified Graduate",
    },
  },
];
