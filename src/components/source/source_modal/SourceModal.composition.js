import React from 'react';
import { SourceModal } from './SourceModal';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { dataProvider, DataProviderContext } from '@logora/debate.data.data_provider';
import { IntlProvider } from 'react-intl';
import { faker } from '@faker-js/faker';

const source = { 
    title: faker.music.songName(),
    description: faker.lorem.sentence(),
    source_url: faker.internet.url(),
    origin_image_url: faker.image.nature(),
    publisher: faker.vehicle.manufacturer()
};

const httpClient = {
    get: () => null,
    post: (url, data, config) => {
        return new Promise(function(resolve, reject) {
            resolve({ data: { success: true, data: { resource: source } }});
        });
    },
    patch: () => null
};

export const DefaultSourceModal = () => {
    const data = dataProvider(httpClient, "https://mock.example.api");

    return (
        <ModalProvider>
            <IntlProvider locale="en">
                <DataProviderContext.Provider value={{ dataProvider: data }}>
                    <SourceModal 
                        onAddSource={() => console.log("Add source")} 
                        onHideModal={() => console.log("Hide modal")} 
                    />
                </DataProviderContext.Provider>
            </IntlProvider>
        </ModalProvider>
    )
};