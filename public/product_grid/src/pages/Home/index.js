import React from "react";
import EmojiBox from "../../components/EmojiBox/index"
import { Row, Col, Spinner } from "reactstrap";
import _ from "lodash";
import Sidebar from '../../components/SideBar/index.js';
import apiCall from '../../api.js'
import "./style.scss";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loader: true,
            bottomLoading: false,
            predata: [],
            page: 1,
            count: 20,
            sort: "id",
            opacity: 0.2,
            resultsDone: false
        };
    }

    componentDidMount() {
        this.fetchProducts();
        window.addEventListener('scroll', this.onScroll);
    }
    fetchProducts() {
        var { page, count, sort } = this.state
        if (page === 1) {
            count = count * 2;
        }
        apiCall(`products?_page=${page}&_limit=${count}&_sort=${sort}`, "get", null, null, (res) => {
            if (res.data.length > 0) {
                var clonedResult = _.cloneDeep(res.data)
                const half = Math.ceil(clonedResult.length / 2);
                this.setState({
                    products: page === 1 ? this.state.products.concat(clonedResult.splice(0, half)) : this.state.products,
                    predata: page === 1 ? clonedResult.splice(-half) : clonedResult,
                    opacity: 1,
                    loader: false,
                    bottomLoading: false
                })
            } else {
                this.setState({
                    resultsDone: true,
                    bottomLoading: false
                })
            }
        }, (err) => {
            console.log(err)
        })
    }
    onSortChanged = (e) => {
        this.setState({
            page: 1,
            count: 40,
            loader: true,
            opacity: 0.2,
            products: [],
            sort: e,
            resultsDone: false,
        }, () => {
            this.fetchProducts();
        })
    }

    onScroll = (e) => {
        if ((window.innerHeight + window.scrollY) === document.getElementsByClassName("content")[0].offsetHeight && !this.state.resultsDone) {
            debugger
            this.setState({
                page: this.state.page == 1 ? 3 : this.state.page + 1,
                bottomLoading: true,
                products: this.state.products.concat(this.state.predata),
            }, () => {
                this.fetchProducts();
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar
                    {...this.props}
                    onSortChanged={this.onSortChanged}
                />
                <Spinner type="grow" style={{ width: '10rem', height: '10rem', display: this.state.loader ? "inline-block" : "none" }} color="dark" />
                <div className="content" style={{ opacity: this.state.opacity }} >
                    <Row>
                        {this.state.products && this.state.products.length > 0 &&
                            (
                                this.state.products.map((product, i) => {
                                    product.index = ++i;
                                    debugger
                                    return (
                                        <>
                                            <Col className="font-icon-list" xl="3" lg="4" md="4" sm="6" xs="6" >
                                                <EmojiBox face={product}></EmojiBox>
                                            </Col>
                                            {product.index % 20 == 0 && (
                                                <Col className="font-icon-list" md="12" style={{ color: "white", textAlign: "left", paddingBottom: "30px" }}>
                                                    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

                                                    <p>But first, a word from our sponsors:</p>
                                                    <img className="ad" src={`http://localhost:3001/ads/?r=${Math.floor(product.index / 20)}`} width="300"></img>
                                                </Col>
                                            )}
                                        </>

                                    )
                                })
                            )
                        }
                        {this.state.resultsDone && (
                            <Col md="12" style={{ color: "white", textAlign: "center", paddingBottom: "30px" }}>
                                ~ end of catalogue ~
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Spinner style={{ color: "white", position: "absolute", right: "45%", width: '10rem', height: '10rem', display: this.state.bottomLoading ? "inline-block" : "none" }} />
                    </Row>
                </div>
            </div>


        );
    }

}
export default Home;
