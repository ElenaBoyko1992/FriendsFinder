1/ 43 урок - контейнерные и презентационные компоненты.
задача контейнерной компоненты удовлетворить нужды презентационной компоненты,
ради которой она и была создана. Задача контейнерной компоненты просто взять и
отрисовать презентационную компоненту и снабдить ее необходимыми данными
Презентационная компонента д.б. "чистая"(т.е. не получать ничего лишнего) и сильно не знависеть от конкретного BLL,
чтобы мы могли возможность переиспользовать её в каком-то другом коде.
А контейнерной компоненте наоборот, можно передать весь store, т.к. она "грязная" компонента.
Оборачиваем компоненту в контейнерную компоненту в том случае, если она выполняет какую-либо логику

2/ 44 урок - контекст.
Используется в случае, когда мы не хотим прокидывать пропсы через кучу компонент,
чтобы в итоге донести их до гр=лубоко вложенной компоненты, т.е. когда в приложении много
слоев компонент.
Используется не всегда, все подряд в него переносить не нужно, но может быть полезен для работы с какими-то
глобальными данными (store, изменить тему, язык и прочее.). Актуальный синтаксис объявления контекста смотреть
в документации реакта. Для меня пока в режиме ознакомления.

1. создание - см. файл StoreContext(архив)
2. оборачиваем App (к примеру) в <StoreContext.Provider value={/* some value */}>, после чего все дети
   обернутой компоненты смогут обращаться к данным из контекста напрямую
3. оборачиваем компоненту, которой нужны данные из контекста в <StoreContext.Consumer> (смотри пример в
   MyPostsContainer)

!!! export type ReduxStoreType = typeof store - команда для создания типа Store из Redux. См. файл redux-store.tsx
исправлено на - export type ReduxStoreType = ReturnType<typeof rootReducer> (из видео по типизации 45 и 49 уроков)

3/ 45 урок - библиотека React-Redux.
Имеет свой Provider (см. index.tsx). По-этому контекст вручную создавать больше не нужно.
connect возвращает нам новую контейнерную компоненту (см. файлы с контейнерными компонентами, напр. DialogsContainer)

пример создания контейнерной компоненты:
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);// во вторых скобках помещаем
презентационную компоненту,
вокруг которой мы хотим создать контейнерную компоненту. Этой строчкой кода мы презентационную компоненту dialogs
законнектили к стору. А в первых скобках указаны функции, которые возвращают презент. компоненте нужные ей пропсы

4/ 47 урок -
store.subscribe(() => {
let state = store.getState();
rerenderEntireTree(state);
}) в index.tsx убираем, т.к. перерисовка теперь происходит за счет локального subscribe в connect контейнерной
компоненты.
НО ВАЖНО - для того, чтобы этот локальный subscribe срабатывал, т.е. происходила перерисовка, при изменении стейта
соблюдать принцип иммутабельности!

5/ 49 урок -
компонента Route отрисовывает указанную в ней компоненту или html-разметку, когда в адресной строке браузера появится
указанный в ее атрибуте адрес.
Если спросят на собесе, зачем нужна строка "import React from "react";", ответ - JSX не работает без реакта
Reducer - это чистая функция, которая принимает старый стейт и action и возвращает измененную копию стейта из этой
функции или старый стейт, если ничего менять не пришлось. Через Reducer идет модификация стейта.
Деструктурировать массив можно двумя путями - при помощи спред-оператора или при помощи .map()

Отрисовываем новую страницу с юзерами:

* Работа начинается с создания reducer (файл users-reducer)
* Далее в redux-store добавляем новую ветку стора (usersPage, которая обслуживается UsersReducer-ом)
* Если нашей новой компоненте нужны пропсы из стора, то мы делаем ее презентационной,
  и создаем над ней контейнерную компоненту (UsersContainer)

6/ Видео по типизации 45 и 49 уроков:
*обязательно типизировать возвращаемые редьюсером значения, а также значения, возвращаемые в функциях
контейнерных компонент (пр. см. UsersContainer)
*типизация Dispatch - см. файл UsersContainer
общие правила типизации:

1 вариант:

1. элементы стейта типизируем в файле с редьюсером к этой части стейта (напр. profile-reducer)
2. тип презентационной компоненты прописываем в файле контейнерной компоненты. Тип презентационной компоненты
   является собирательным из типов функции, возвращающей стейт для этой през. комп., и функции, возвращающей нужные
   коллбэки для этой през. компоненты (см. любой файл с контейнерной компонентой, станет понятно).

2 вариант (более предпочтительный и лёгкий):
см. файл dialogs-reducer

7/ 52 урок - Side Effect
функциональная компонента не должна поизводить никаких Side Effects, а именно:
*делать запросы на сервер
*изменять приходящие к ней параметры
*менять DOM напрямую
*менять какие-дибо внешние переменные

8/ 53 урок - классовые компоненты
классы нужны для создания нескольких однотипных объектов ("штамповки объектов")
constructor класса вызывается в момент вызова "new", вручную не вызывается никогда
классовая компонента возвращает JSX с помощью метода render()

9/ 54 жизненный цикл классовой компоненты
! side-эффекты, в т.ч. запросы на сервер делать не в constructor, а в методе componentDidMount()

10/ 55 pagination (постраничный вывод)
get запрос на сервер всегда ограничивается тольк url-адресом
API - это интерфейс взаимодействия с чем-либо (application program interface)
get параметры для отправки на сервер определены в его API
get параметры в строке браузера начинаются после "?". Пример

- https://social-network.samuraijs.com/api/1.0/users?page=3&count=2

11/ 56 урок
презентационная компонента всегда функциональная, не имеет side-эффектов
т.к. наша user компонента перестала быть чистой (т.к. она делает ajax запросы и перестала быть функциональной),
необходимо создать третью компоненту, функциональную, которая и будет презентационной. А две другие компоненты
(UserContainer и UsersAPIComponent (бывш. User)) станут контейнерными. Вся контейнерная логика (комп. UserContainer и
UsersAPIComponent) лежат в
одном файле - UsersContainer.
!!!UsersAPIComponent переименована в UsersContainer (смотри файл UsersContainer)

12/ 57 урок
Preloader (кружочек загрузки)
кнопка "No throttling" в разделе Network в консоли Chrome позволяет замедлить скорость интернета до
нужных параметров

13/ 58 урок
в контейнерной компоненте UsersContainer избавляемся от функции mapDispatchToProps, вместо нее в connect вторым
параметром передаем объект с АС (подробнее - см.файл UsersContainer), а connect уже самостоятельно приводит этот объект
к тому коду, который был в функции mapDispatchToProps. Цель всего этого - значительное сокращение кода.
Далее переименовали названия функций AC (убрали AC на конце),
чтобы еще больше сократить код (объект, передаваемый вторым параметром в connect).

14/ 59 урок
<Route path={'/dialogs'}
render={() => <DialogsContainer/>}/> - в path после '/dialogs' может стоять что угодно, не важно,
компонента все равно отрисуется, главное, чтобы был /dialogs в адресной строке

15/ 60 урок
HOC WithRouter
функция WithRouter аналог connect. Она также создает контейнерную компоненту и передаёт данные в виде пропсов из
контейнерной в дочернюю компоненту, но в отличие от connect, данные для прокидки в пропсы она берет не из state, а из
URL.
(как правильно до нужных нам данных достучаться, см. через debugger)

Итого нашу изначальную презентационную компоненту Profile мы обернули еще в 3 контейнерных:

1. ProfileContainer (для отправки запроса на сервер, делает "грязную" работу)
2. Далее ProfileContainer обернули в WithUrlDataContainerComponent (передаем из WithUrlDataContainerComponent в
   ProfileContainer
   данные из URL)
3. WithUrlDataContainerComponent обернули еще в одну контейнерную комп. с помощью connect для передачи в нее пропсов из
   state

URL-адрес, текущий адрес страницы, это тоже ИСТИНА. До этого у нас истиной был BLL (Redux, state), и UI (React) зависел
только от него, а сейчас у нас истиной ещё стал и URL-адрес!!!

Чтобы работать с адресом, компоненте нужно получить через props нужные данные. Где их взять в props? С помощью
HOC-функции
withRouter!

Функция withRouter наподобие функции connect создаёт над отданной ей компонентой ещё одну контейнерную, которая добавит
в нашу целевую компоненту через пропсы нужные данные.

В нашем случае нас интересует props.match.params!

16/ 61 урок. Логинизация
при кроссдоменном запросе (когда, например, у нас сайт загружен через порт 3000, а за данными мы идем на другой домен,
в данном случае апишка соцсети) при запросе на сервер авторизация автоматически может не происходить (даже если в файле
куки
указано, что мы авторизованы), так устроена политика безопасности браузера. Чтобы этого избежать, при отправке запроса
на сервер в команде axios.get вторым параметром нужно указать этот объект:
{ withCredentials: true } (см. файл HeaderContainer)

17/ 62 урок. Follow-unfollow API

Follow-unfollow диспачим не сразу в store из UI, а сначала из UI отправляем на сервер post\delete (т.к. Follow\unfollow)
запрос об изменении статуса подписки,
потом получаем подтверждение с сервера, что подписка\отписка произошла, и только после этого диспачим в стор, что
Follow-unfollow.
Важно слать эти запросы на подписку\отписку будучи авторизованными на сайте.

в данном случае, т.к. у нас по прежнему присутствует кроссдоменность в пост запрос также надо передать объект
{ withCredentials: true }, но уже не вторым параметром, как при гет запросе, а третьим (см. файл Users tsx).
у delete запроса { withCredentials: true }, также, как и у get запроса идет вторым параметром.

все запросы на сервер кроме гет требуют обязательного указания ключа доступа (сайт с апишкой -> account setting ).
Вставляем этот ключ вторым параметром в объект, где { withCredentials: true } (см. файл Users tsx)

18/ 63 урок. DAL уровень
Это уровень где хранится логика запросов на сервер (данный уровень предназначен для разгрузки компонент от излишнего для
них кода). (см. файл API.ts)

19/ 64 урок. Button disabled (follow/unfollow)
Для предупреждения излишней отправки запросов на сервер (когда пользователь бесконтрольно кликает по кнопке) во
избежание
его перегрузки.

20/ 65 и 66 урок. React-thunk (Санки)
Санка - функция, которая делает асинхронную операцию (запрос на сервер) и потом же делает dispatch обычного экшена (или
даже несколько диспатчей, в зависимости от
сложности логики конкретной операции). В качестве параметра в санку приходит dispatch.
!!!UI взяимодействует с BLL только через dispatch, в связи с этим санка тоже диспачится. Но санка - это функция, а
диспатчить в редьюсер мы можем только объект экшн. В связи с этим, т.к. стор по умолчанию не умеет принимать в качестве
диспатча функцию, необходимо создать middle ware (промежуточный слой). Для этого:
1.в файле redux-store функции createStore
вторым параметром передаем applyMiddleware(thunkMiddleware)
2.устанавливаем уarn i redux-thunk
3.в redux-store прописываем импорт import thunkMiddleware from 'redux-thunk'

Функцию Thunk оборачиваем в ThunkCreator (см файлы с редьюсерами) для передачи в санку каких-либо параметров
(в саму санку параметры передать мы не можем, т.к. она является коллбэком, который вызывается автоматически редаксом),
а благодаря ThunkCreator-у через замыкание функция-санка как раз и возьмет все необхыдимые ей параметры, которые
мы в этот ThunkCreator передадим в компоненте.

21/ 67 урок. Redux-thunk
В редьюсере запросы на сервер делать нельзя, т.к. редьюсер должен срабатывать моментально.

22/ 68 урок. Redirect
для редиректа есть специальная компонента <Redirect to={"/Login"}/> - в атрибуте to указывать путь на компоненту,
куда нужно осуществить редирект (пр. см. в Dialogs.tsx).

23/ 69 урок. HOC - это функция, принимающая на входе компонент и возвращающая другой компонент, контейнерный.
Задача контейнерной компоненты делать "грязную" работу - доставать прпопсы из стейта, делать асинхронный запрос,
доставание чего-либо из урла и т.д. HOC помогает "клепать" однообразные контейнерные компоненты, которые делают что-то
одно,
но, закидывая в него разные компоненты в качестве параметра.
Хоки принято называть, начиная со слова With.

Типизация компоненты, приходящей в HOC - см. файл withAuthRedirect

24/ 70 урок функция compose.
Данную функцию предоставляет Redux
образец применения compose см в файле DialogsContainer
Функция compose оборачивает переданную ей во вторых скобках компоненту в контейнерные компоненты, которые создают
хоки, переданные ей в первых скобках. Т.е. она как бы собирает все хоки воедино и оборацивает в них целевую
презентационную
компоненту. Т.е. все оборачивание происходит в одном месте, в функции compose.
!Важно - оборачивание происходит снизу вверх, т.е. сначала целевая компонента оборачивается в хок, указанный самым
последним (т.е. нижним) и далее, поднимаясь все выше и выше.
!compose обязательно нужно типизировать, иначе будет ошибка! (<React.ComponentType>)

25/ 71 урок. setState и local state у классовых компонент
локальный стейт в классовой компоненте хранится в объекте state (пример в файле ProfileStatus.tsx)
метод setState вносит изменения в локальный стейт в части значений, указанных в объекте, переданном ему в качестве
аргумента
и перерисовывает компоненту (аналог хука useState в функциональной компоненте)

26/ 74 урок. Метод жизненного цикла componentDidUpdate()
необходимость применения данного метода в этом уроке была обусловлена тем, что в компоненте ProfileContainer
методы this.props.getUserProfile(userId) и this.props.getStatus(userId) вызываются по отдельности, и, соответственно,
может получиться так, что статус придет позже, чем профиль и в связи с этим в ProfileStatus при включенном режиме
редактирования в инпуте будет отображаться не текущий статус, а пустота, т.к. локальный статус (см. state в
ProfileStatus)
будет проинициализирован пустой строкой (т.к. изначально в initialState у статуса пустая строка). Чтобы избежать такой
ситуации,
на помощь приходит метод жизненного цикла componentDidUpdate.
Применение см. в ProfileStatus
В качестве параметров при срабатывании componentDidUpdate в него автоматически приходят prevProps и prevState
(componentDidUpdate(prevProps, prevState)) и с помощью этих двух параметров мы можем отслеживать, где же именно
произошли изменения (почему компонента перерисовалась) - в стейте или в пропсах. Иногда, это может понадобиться.
!!!Внутри componentDidUpdate все "сетстейты" всегда должны находиться внутри какого-то условия if, иначе
может произойти зацикливание (см. файл ProfileStatus)

27/ 75 урок. Библиотека Redux-form
Redux-form это HOC, который создает контейнерную компоненту над нашей компонентой, ответственную за взаимодействие этой
нашей компоненты со стором.

1. в redux-store делаем импорт - 'import { reducer as formReducer } from 'redux-form''
2. добавляем в стор: 'form: formReducer' (имя свойства обязательно должно быть 'form'!)
3. далее в файле компоненты оборачиваем нашу компоненту с формой (см. файл Login.tsx):

'const LoginReduxForm = reduxForm({
// a unique name for the form
form: 'login'
})(LoginForm)'

4. Теперь вместо нашей компоненты отрисовываем контейнерную компоненту, которую мы получили (LoginReduxForm)
5. Вместо инпутов пишем Field c атрибутом 'component={'input'}' (см. файл Login.tsx). Важно указывать атрибут name
   !! В филды уже вшиты онченьджи, которые передают в стейт через собственный редьюсер текущее введенное значение, т.е.
   нам onchange на каждый фиелд прописывать не надо, что очень удобно.
6. Благодаря контейнерной компоненте, что создается хоком reduxForm, помимо прочих в нашу компоненту в пропсах приходит
   функция handleSubmit. Если прописать ее форме (см файл.), то при сабмите перезагрузки страницы происходить не будет,
   т.к. в этот handleSubmit вшит preventDefault, т.е. отмена действий по умолчанию.

!!! что делает handleSubmit:

* preventDefault
* собирает все данные из инпутов в единый объект
* передает в родительский онсабмит (onSubmit контейнерной компоненты) эти данные. Т.е. у нашей контейнерной компоненты,
  созданной хоком reduxForm обязательно нужно прописать метод в атрибуте onSubmit (см. файл Login.tsx)

28/ 77 урок. Библиотека Redux-form - валидация
валидационная функция (или несколько) передается в массиве в атрибуте validate у Field
для красивого оформления обычные теги форм перевели в компоненты, например Textarea

итого на этом уроке создали неск. файлов - FormControls (с компонентами формы), validators (с функциями-валидаторами)

29/ 78 урок. Логинизация
WithCredentials: true цепляет куку к каждому запросу.

Протипизировать входящие данные при запросе на сервак в редьюсерах

30/ 79 урок - Redux-Form - stopSubmit
stopSubmit применен в санке login в файле auth-reducer
stopSubmit является AC из Redux-Form

31/ 80 урок - инициализация приложения
В данном уроке избавляемся от проблемы "дерганий" при перезагрузке страниц (проверка, авторизованы мы или нет)
сделали App классовой компонентой, обернули в контейнерную (чтобы прокинуть пропсы), а также
обернули в WithRouter, т.к. connect плохо работает с роутами, а WithRouter помогает этой ошибки избежать.
!!! Редирект можно делать не только в JSX разметке (с помощью роутов), но и программно, более подробно см. в файле
ProfileContainer, в методе ComponentDidMount ("this.props.history.push('/login');") Но все равно лучше стараться делать
рендер через JSX

32/ 81 урок - селекторы (reselect part 1)
Селектор - это функц, которая принимавет весь стейт целиком, достает из него то, что нужно, и возвращает в бизнес
Используются в функциях MapStateToProps

33/ 82 урок - mapStateToProps (reselect part 2)
использование селекторов в mapStateToProps может приводить к некоторым затруднениям:

1. функция селектор будет каждый раз срабатывать (критично при сложных расчетах внутри этой фун)
2. тяжело дебажить (т.к. каждый раз будет срабатывать)
3. если внутри фун.-селектора есть расчеты, возвращающие новый массив (напр. filter, map и т.д.), перерисовка компоненты
   будет происходить каждый раз, даже когда фактических изменений не было, т.к. фильтер, мап и т.д. каждый раз вернут
   якобы новый стейт (иммутабельность), а
   лишняя перерисовка это всегда трудозатратно

34/ 83 урок - библиотека Reselect (reselect part 3)
Сложные селекторы создавать с пом. библиотеки Reselect. Использование библ Reselect помогает избежать всех 3-х проблем,
указанных в предыдущем уроке.
Библиотека Reselect позволяет избежать лишних перерисовок, т.к. отслеживает, были ли изменения в зависимостях,
и если их не было, перезапускать селектор не будет. У сложных селекторов, созданных с пом. Reselect может быть несколько
зависимостей.
Зависимостью является селектор (как примитивный, так и сложный). Библиотека Reselect вызывает селекторы, являющиеся
зависимостями,
если изменений не произошло, функцию не запустит.
Пример использования см. в файле users-selectors

пример:

const getUsersSelector = (state: ReduxStoreType) => {
return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users: Array<UserType>) => {
return users.filter(u => true)
})

35/ 84 урок - Хуки

Хук - это функция

36/ 85 урок - Хук useEffect
Хуки нельзя использовать в условном ветвлении и циклах

37/ 86 урок - Virtual DOM
Основное предназначение компонегнты - возвращать JSX-разметку
DOM - это объекты (каждый тег - это объект)
Преимущество React в том, что у него есть Virtual DOM, благодаря которому при каких-либо изменениях
не происходит полной перерисовки документа, а только в тех местах, где произошли изменения

38/ 87 урок - shouldComponentUpdate (метод в классовой компоненте), React.PureComponent (наследуем от этого нашу
классовую компоненту вместо наследования от React.Component), React.memo (для функциональной компоненты) - с помощью
этих
трех способов можно избежать лишней ненужной перерисовки компоненты (компонента не перерисуется, если не было изменений
в пропсах и локальном стейте).

39/ 88 урок - чистая функция
Чистой функции свойственно следующее:
1.иммутабельность
2.должен быть ретурн (т.к. она не изменяет входящих данных, по-этому по-любому должна что-то возвращать)
3.нет сайд-эффектов (не изменяет глоб переменные, не делает запросы на сервер, не меняет то, что в функц. пришло,
не делает асинхронные действия)
4.детерминированнность и идемпотентность - т.е. сколько бы раз мы не передали в функцию одини и те же данные,
результат, который вернет функция, всегда будет один и тот же

!!!компоненты, селекторы, редьюсеры - д.б. чистфыми функциями

40/ 89 урок - тестируем редьюсер
юнит тест или модульное тестирование (это тест маленьких кусочков, например, редьюсера) vs интеграционный (финальный,
общий) тест.
я делала тесты редьюсеров, тесты компонент не делала (они тоже бывают, но не было в обучении)

41/ 90 урок - Redux-ducks
Принципы:

1. редьюсеры, АС, TC, экшены, санки и проч. должны храниться все в одном файле - done
2. Больше уникальности названию экшн-типа (см. Auth-reduser.ts) -
3. Async/await вместо .then - done

42/ 91 урок - chrome extensions for React and Redux
мои обычные расширения (пользовательские, типа LingvaLeo) могут мешать расширениям разработчика, в связи с этим
для разработки и установки разработческих приложений создать второй аккаунт в браузере (другие профили)

43/ 92 урок - тестирование компонента
jest - среда запуска тестов, встроена.

! --save-dev обозначает, что устанавливаемый пакет попадет в зависимости для разработки (devDependencies),
а в общие зависимости, которые нужны будут потом для функцтонирования приложения в браузере, не попадет (dependencies),
т.к. оно там не нужно как правило

Для теста компонент подключили библиотеку react-test-renderer
!!!Обратите внимание: устанавливайте версию react-test-renderer, такую же, какая у вас версия react-а

44/ 93 урок - paginator, постраничный вывод

Пересмотреть видео про пагинацию!! Вспомнить, что откуда берется и почему такая логика?
остановилась на 19:50 видео

45/ 94 урок - React.lazy и React.Suspense
При обычном раскладе приложение загружается так - при первоначальной загрузке подгружаются сразу все компоненты и файлы,
даже если мы их все сразу и не испоьзуем, из-за этого первоначальная загрузка немного затягивается. Но есть концепция
lazy loading, благодаря которой компоненты и файлы подгружаются не сразу все целиком, а постепенно в процессе
использования приложения по необходимости. Как лучше делать единого ответа нет, в каждом случае скажет заказчик, как ему
удобрнее. Можно делать частичную ленивую загрузку - что-то подгружать сразу, а что-то лениво. 