import { connect } from 'react-redux';
import MainHome from '../screens/MainHome';
import * as action from '../action/index';
import {apiStore} from '../apis/index';

const mapStateToProps = function (state) {
    return { categoryListItem: state.categoryListItem }
}

const mapDispatchToProps = function (dispatch) {
    // return {
    //     onGetAllTodo: async () => {
    //         const list = await apiTodoList.getAllTodoApi();
    //         dispatch(action.onGetAllTodo(list));
    //     },
    // }
    return {
        onGetCategoryListItem: async categoryName => {
            const categoryListItem = await apiStore.getCategoryListItemApi(categoryName);
            dispatch(action.onGetCategoryListItem(categoryListItem))
        }

    }
}

const MainHomeContainer = connect(mapStateToProps,mapDispatchToProps)(MainHome);
export default MainHomeContainer;