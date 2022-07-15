import './style.css';
import App from './components/App';

customElements.define('my-app', App);

const appContainer = document.querySelector<HTMLDivElement>('#app')!

appContainer.innerHTML = `
    <my-app name='Tiberiu'></my-app>
    <button id="btn">Do something</button>
`;

const btn = document.querySelector<HTMLButtonElement>('#btn') as HTMLButtonElement;
btn.onclick = () => { document.querySelector('my-app')?.setAttribute('name', 'Valeriu') };





