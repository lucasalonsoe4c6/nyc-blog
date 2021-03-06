import React from 'react'
// Components
import Head from 'next/head';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_METADATA } from '../../ApolloClient/querys';
// Utils
import { fixFirebaseURL } from '../../utils/fixFirebaseURL';
// Types
import { MetadataNames, MetadataType } from '../../types/Types';

type Props = {
    title: string;
};

export default function CustomHead({ title }: Props) {
    const { data: metadataQuery } = useQuery(GET_METADATA);
    const metadata = metadataQuery?.getMetadata || [];

    const icon: MetadataType = metadata.find((data: MetadataType) => data.name === MetadataNames.HEAD_ICON);

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content="New York, NYC, Traveling, Lifestyle" />
            <meta name="description" content="Tracysnewyorklife.com is a lifestyle and travel blog based in NYC. Creator Tracy Kaler and bloggers feature the best of living, food, culture, travel, and more to readers around the world. The blog offers the best of New York City life, Tracy's adventures in the Big Apple and beyond, as well as musings and opinions from New Yorkers. Tracy informs and entertains on this top New York-centric blog." />
            <meta name="author" content="Lucas Alonso" />
            <link rel="icon" href={icon?.value ? fixFirebaseURL(icon.value) : '/favicon.ico'} sizes="32x32" />
            <title>{title}Tracy Kaler&apos;s New York Life + Travel Blog | Top NYC Blog</title>
        </Head>
    )
};