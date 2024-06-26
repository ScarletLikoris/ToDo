import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

import Badge from '../Badge';

import './List.scss';

import { ReactComponent as RemoveSvg } from '../../assets/img/remove.svg';

const List = ({
    items,
    isRemovable,
    onClick,
    onClickItem,
    onRemove,
    activeItem,
}) => {
    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(item.className, {
                        active: item.active
                            ? item.active
                            : activeItem && activeItem.id === item.id,
                    })}
                    onClick={onClickItem ? () => onClickItem(item) : null}
                >
                    <i>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <Badge color={item.color.name} />
                        )}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && (
                        <RemoveSvg
                            onClick={() => {
                                removeList(item);
                            }}
                            className="list__remove-icon"
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default List;
