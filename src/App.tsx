import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { Breadcrumb, Layout, Space } from 'antd'
import { Base, Converter } from './pages';
import './App.scss';

const { Header, Content } = Layout

function App() {
    return (
		<Space direction='vertical'>
			<Layout className='layout'>
				<BrowserRouter>
					<Header className='layout__header'>
						<Breadcrumb className='header__nav'>
							<Breadcrumb.Item >
								<NavLink to='/base' className={isActive => 'nav__link' + (isActive ? ' active-link' : '')}>Главная</NavLink>
							</Breadcrumb.Item>
							<Breadcrumb.Item>
								<NavLink to='/convertor' className={isActive => 'nav__link' + (isActive ? ' active-link' : '')}>Конвертор</NavLink>
							</Breadcrumb.Item>
						</Breadcrumb>
					</Header>
					<Content className='layout__content'>
						<Switch>
							<Route path={'/convertor'}>
								<Converter />
							</Route>
							<Route path={'/base'} >
								<Base />
							</Route>
							<Route path={'*'} >
								<Redirect to={'/base'} />
							</Route>
						</Switch>
					</Content>
				</BrowserRouter>
			</Layout>
		</Space>
    );
}

export default App;
