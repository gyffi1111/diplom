import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import EditForm from './EditForm';

class EditItem extends Component
{
    render() {
        const { phones, isLoading } = this.props;

        let item = isLoading ? phones.filter((value) => {
            return value.id === Number(this.props.match.params.id);
        }) : null;

        return (
            <Fragment>
                {(item && item.length > 0) ? <EditForm itemOne={item[0]} phones={this.props.phones} /> : null}
            </Fragment>
        )
    }
}

const mapStateToProps = ({ phones }) => {
    return {
        phones: phones.items,
        isLoading: phones.isLoading,
        isAddPhone: phones.isAddPhone
    }
};

export default connect(mapStateToProps)(EditItem);