import React from 'react'
import { Router } from 'react-router-dom'
import { IRoute } from './IRoute'
import { RegisterPage } from '../components/pages/Register'
import { LoginPage } from '../components/pages/Login'
import { paths } from '../constants/paths'
import { HomePage } from '../components/pages/Home'

export const Routes:IRoute[] = [
    {component: HomePage,     url: paths.Home,    title: 'home'},
    {component: RegisterPage, url: paths.Register, title: 'register'},
    {component: LoginPage,    url: paths.Login,    title: 'login'},
]