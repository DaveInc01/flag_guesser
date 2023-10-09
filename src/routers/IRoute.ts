import { ComponentType } from "react";

export interface IRoute {
    url: string,
    title: string,
    component: ComponentType<{}>
} 