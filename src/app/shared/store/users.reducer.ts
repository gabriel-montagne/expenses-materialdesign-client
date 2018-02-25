import { UsersActions } from '../../layout/users/users.actions';
import { IUser } from '../../layout/users/user';

export interface IUsersStore {
    users: IUser[];
}

export const INITIAL_STATE: IUsersStore = {
    users: []
};

export function UsersReducer(state: IUsersStore = INITIAL_STATE,
                                action: any): IUsersStore {
    switch (action.type) {
        case UsersActions.SAVE_USERS:
            return { ...state, users: action.payload};
        case UsersActions.SAVE_USER:
            const users = state.users;
            const idx = users.findIndex((elem) => {
                return elem.id === action.payload.users.id;
            });
            if (idx > -1) {
                const item = users[idx];
                users.splice(idx, 1, action.payload.users);
            }
            return { ...state, users: users};
        default:
            return state;
    }
}
