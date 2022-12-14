import React, { useCallback, useState } from 'react'
import styles from './Units.module.css'
import { IUnitProps, Unit } from '../Unit/Unit'
import { IUnit } from '../../pages/SlideEditor/types'
import { DragAndDropSorter, IDragAndDropSorterProps } from '../DragAndDropSorter/DragAndDropSorter'

export interface IUnitsProps {
  units: IUnit[]
  onUnitClick: IUnitProps['onClick']
  onDrop: IDragAndDropSorterProps['onDrop']
}

export const Units: React.FC<IUnitsProps> = ({ units, onUnitClick, onDrop }) => {
  const [isSomeOneDragging, setIsSomeOneDragging] = useState(false)
  const [draggingId, setDraggingId] = useState('')
  const onDragStart = useCallback<IDragAndDropSorterProps['onDragStart']>((id) => {
    setDraggingId(id)
    setIsSomeOneDragging(true)
  }, [])
  const onDragEnd = useCallback(() => {
    setIsSomeOneDragging(false)
  }, [])
  const renderItem = useCallback(
    ({ id, iconName, title, description }: IUnit, index: number, array: IUnit[]) => {
      const previousElement = array[index - 1]
      const nextElement = array[index + 1]
      const isDropAfterVisible = nextElement && nextElement.id === draggingId
      const isDropBeforeVisible = previousElement && previousElement.id === draggingId
      return (
        <DragAndDropSorter
          key={id}
          id={id}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isSomeOneDragging={isSomeOneDragging}
          isDropAfterVisible={isDropAfterVisible}
          isDropBeforeVisible={isDropBeforeVisible}
        >
          <Unit id={id} iconName={iconName} title={title} description={description} onClick={onUnitClick} />
        </DragAndDropSorter>
      )
    },
    [draggingId, isSomeOneDragging, onDragEnd, onDragStart, onDrop, onUnitClick]
  )

  return <div className={styles.wrapper}>{units.map(renderItem)}</div>
}
