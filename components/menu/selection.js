import { Tab } from '@headlessui/react'
import styles from '../../styles/Components.Menu.module.css'
import * as format from '../../utils/format'

export default function FeatureSelection(props) {
    const {components, className} = props
    return (
        <div className={format.classNames(className)}>
        <Tab.Group>
            <div className={styles.tabs}>
                <Tab.List className={styles.wrapper} style={{marginBottom: "8px"}}>
                {Object.keys(components).map((component) => (
                    <Tab
                    key={component}
                    className={({ selected }) =>
                        format.classNames(styles.item,selected
                            ? ''
                            : ''
                        )
                    }
                    >
                    {component}
                    </Tab>
                ))}
                </Tab.List>
            </div>
            <Tab.Panels className="mt-2">
            {Object.values(components).map((component, idx) => (
                <Tab.Panel
                key={idx}
                className={format.classNames(
                    '',
                    ''
                )}
                >
                    {component.container}
                </Tab.Panel>
            ))}
            </Tab.Panels>
        </Tab.Group>
        </div>
    )
}
