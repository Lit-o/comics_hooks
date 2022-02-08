import {useState, memo, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


    // React.memo без второго параметра проводит поверхностное сравнение объекта props, если нужно глубокое сравнение, 
    // то пишем функцию сравнения и передает вторым параметром в memo
    // Для классовых компонентов используется React.PureComponent работает из коробки для поверхностного, 
    // для глубокого используем shouldComponentUpdate(nextProps, nextState)

// class Form extends Component {
//     shouldComponentUpdate(nextProps, nextState) {
//         if (this.props.someObj.deepObj.someKey === nextProps.someObj.deepObj.someKey) {
//             // False это ответ на вопрос "должен ли компонент обновиться?"
//             return false
//         } return true
//     }
// }

// чтобы memo в функциональных компонентах работало со state, нужно интересующий нас кусок обернуть в компонент и 
// передать в него с помощью пропсов состояние из useState

// если Memo постоянно применять к компонентам, которые часто получают разные пропсы, то будет дополнительная 
// нагрузка на рассчеты. Применять мемо нужно не везде, а на средне-больших компонентах в которых 
// props меняются редко

// Если в пропсах мы будем передавать функцию, то это ломает memo, потому что функция будет все время новым объектом
// Решение функцию, если она действительно одна и та же оборачивать в useCallback

const propsCompare = (prevProps, newProps) => {
    // если по конкретному сравнению props вернет true, то не будет перерендеривать 
    return prevProps.someObj.deepObj.someKey === newProps.someObj.deepObj.someKey && prevProps === newProps
}

const Form = memo((props) => {
    return (
        <Container>
            <form className="w-50 border mt-5 p-3 m-auto">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                    <input value={props.mail} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </form>
        </Container>
    )
}, propsCompare)

function App() {
    const [data, setData] = useState({
        mail: "name@example.com",
        text: 'some text'
    });

    const onLog = useCallback(() => {
        console.log('Wake up, Neo...')
    },[])
    // [] - пустой массив зависимостей говорит, что эта функция никогда не изменится
    // и эта функция даже переданная в пропсы не поломает нам memo

    return (
        <>
            <Form mail={data.mail} text={data.text} onLog={onLog}/>
            <button 
                onClick={() => setData({
                    mail: "second@example.com",
                    text: 'another text'
                })}>
                Click me
            </button>
        </>
    );
}

export default App;
