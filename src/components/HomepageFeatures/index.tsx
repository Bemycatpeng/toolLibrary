import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/dataAccumulation.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: '这里面是什么',
    Svg: require('@site/static/img/dataAccumulation2.svg').default,
    description: (
      <>
          这里记录了您在学习新技术或新工具时所学到的知识和经验，例如如何使用 React、如何使用 Git 管理代码等。该文档的重点是为您自己和其他人提供有用的参考资料，以便在未来的项目中更加高效地使用这些工具和技术。
      </>
    ),
  },
  {
    title: '他能给你带来什么',
    Svg: require('@site/static/img/dataAccumulation3.svg').default,
    description: (
      <>
          它们可以帮助您和您的团队在技术领域取得成功，同时也为未来的项目提供了重要的参考资料。选择正确的文档类型将有助于确保您的信息得到清晰地传达和理解，同时也将使您的团队更加高效地工作。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
